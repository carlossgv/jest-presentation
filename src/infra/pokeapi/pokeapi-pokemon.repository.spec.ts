import PokeApiPokemonRepository from "./pokeapi-pokemon.repository";
import Pokemon from "../../core/entities/pokemon.entity";
import axios from "axios";
jest.mock("axios");
jest.mock("../../core/entities/pokemon.entity");

describe("PokeapiPokemonRepository", () => {
  let repository: PokeApiPokemonRepository;
  let axiosMock: jest.Mocked<typeof axios>;
  let pokemonMock: jest.MockedClass<typeof Pokemon>;
  beforeEach(() => {
    pokemonMock = Pokemon as jest.MockedClass<typeof Pokemon>;
    axiosMock = axios as jest.Mocked<typeof axios>;
    repository = new PokeApiPokemonRepository();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemonEvolutionChain", () => {
    it("should return an array of Pokemon names", async () => {
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "evolution-chain-url",
          },
        },
      });

      axiosMock.get.mockResolvedValue({
        data: {
          chain: {
            species: { name: "pokemon1" },
            evolves_to: [
              {
                species: { name: "pokemon2" },
                evolves_to: [{ species: { name: "pokemon3" }, evolves_to: [] }],
              },
            ],
          },
        },
      });

      repository["getEvolutionsFromChain"] = jest
        .fn()
        .mockReturnValue(["pokemon1", "pokemon2", "pokemon3"]);

      const response = await repository.getPokemonEvolutionChain("pokemon1");

      expect(response).toEqual(["pokemon1", "pokemon2", "pokemon3"]);
      expect(axiosMock.get).toHaveBeenCalledTimes(2);
      expect(axiosMock.get).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon-species/pokemon1",
      );
      expect(axiosMock.get).toHaveBeenCalledWith("evolution-chain-url");
      expect(repository["getEvolutionsFromChain"]).toHaveBeenCalledTimes(1);
      expect(repository["getEvolutionsFromChain"]).toHaveBeenCalledWith({
        species: { name: "pokemon1" },
        evolves_to: [
          {
            species: { name: "pokemon2" },
            evolves_to: [{ species: { name: "pokemon3" }, evolves_to: [] }],
          },
        ],
      });
    });

    it("should throw error if data is not available", async () => {
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "evolution-chain-url",
          },
        },
      });

      axiosMock.get.mockResolvedValue({
        data: { chain: null },
      });

      repository["getEvolutionsFromChain"] = jest
        .fn()
        .mockReturnValue(["pokemon1", "pokemon2", "pokemon3"]);

      try {
        await repository.getPokemonEvolutionChain("pokemon1");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("No evolution chain found");
      }

      // expect(axiosMock.get).toHaveBeenCalledTimes(2);
      // expect(axiosMock.get).toHaveBeenCalledWith(
      //   "https://pokeapi.co/api/v2/pokemon-species/pokemon1",
      // );
      // expect(axiosMock.get).toHaveBeenCalledWith("evolution-chain-url");
      // expect(repository["getEvolutionsFromChain"]).toHaveBeenCalledTimes(0);

      expect.assertions(2);
    });

    // Other way of testing async errors
    it("should throw error if data is not available", async () => {
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "evolution-chain-url",
          },
        },
      });

      axiosMock.get.mockResolvedValue({
        data: { chain: null },
      });

      repository["getEvolutionsFromChain"] = jest
        .fn()
        .mockReturnValue(["pokemon1", "pokemon2", "pokemon3"]);

      expect(repository.getPokemonEvolutionChain("pokemon1")).rejects.toThrow(
        "No evolution chain found",
      );
    });
  });

  describe("getPokemon", () => {
    it("should return a Pokemon entity", async () => {
      axiosMock.get.mockResolvedValue({
        data: {
          name: "pikachu",
          types: [{ type: { name: "electric" } }],
        },
      });
      const response = await repository.getPokemon("pikachu");

      expect(pokemonMock).toHaveBeenCalledWith("pikachu", ["electric"]);
      expect(pokemonMock).toHaveBeenCalledTimes(1);

      expect(response).toBeInstanceOf(pokemonMock);
      expect(response).toEqual(pokemonMock.mock.instances[0]);
    });
  });
});

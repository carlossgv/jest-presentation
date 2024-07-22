import axios from "axios";
import PokeApiPokemonRepository from "./pokeapi-pokemon.repository";
jest.mock("axios");

describe("PokeApiPokemonRepository", () => {
  let repository: PokeApiPokemonRepository;
  let axiosMock: jest.Mocked<typeof axios>;
  beforeEach(() => {
    axiosMock = axios as jest.Mocked<typeof axios>;
    repository = new PokeApiPokemonRepository();
  });
  afterEach(() => {
    // Clear >> Reset >> Restore
    jest.resetAllMocks();
  });

  describe("getEvolutionsFromChain", () => {
    it("should throw and error if no chain is found - regular way", () => {
      // Arrange
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "algo1",
          },
        },
      });
      axiosMock.get.mockResolvedValue({
        data: {},
      });

      // Action
      const act = async () => repository.getPokemonEvolutionChain("nombre");

      // Assert
      expect(act).rejects.toThrow("No evolution chain found");
    });

    it("should throw and error if no chain is found - async await way", async () => {
      // Arrange
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "algo1",
          },
        },
      });
      axiosMock.get.mockResolvedValue({
        data: {},
      });

      try {
        // Action
        await repository.getPokemonEvolutionChain("nombre");
      } catch (error) {
        // Assert
        expect(error).toEqual(new Error("No evolution chain found"));
        expect(error.message).toBe("No evolution chain found");
      }

      expect.assertions(2);
    });

    it("should return an array with the names of the species in the chain", async () => {
      axiosMock.get.mockResolvedValueOnce({
        data: {
          evolution_chain: {
            url: "algo1",
          },
        },
      });
      axiosMock.get.mockResolvedValue({
        data: {
          chain: "algo2",
        },
      });
      repository["getEvolutionsFromChain"] = jest.fn();
      (
        repository["getEvolutionsFromChain"] as unknown as jest.Mock
      ).mockReturnValue("algo3");

      const response = await repository.getPokemonEvolutionChain("nombre");

      // respuesta del metodo
      expect(response).toBe("algo3");

      // llamadas de axios
      expect(axiosMock.get).toHaveBeenCalledTimes(2);
      expect(axiosMock.get).toHaveBeenNthCalledWith(
        1,
        "https://pokeapi.co/api/v2/pokemon-species/nombre",
      );
      expect(axiosMock.get).toHaveBeenNthCalledWith(2, "algo1");

      // llamadas getEvolutionsFromChain
      expect(repository["getEvolutionsFromChain"]).toHaveBeenCalledTimes(1);
      expect(repository["getEvolutionsFromChain"]).toHaveBeenCalledWith(
        "algo2",
      );
    });

  });

  test.todo("getPokemon");
  test.todo("getEvolutionsFromChain");
});

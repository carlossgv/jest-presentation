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

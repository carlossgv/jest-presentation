import axios from "axios";
import PokeApiPokemonRepository from "./pokeapi-pokemon.repository";
jest.mock("axios");

describe("PokeapiPokemonRepository", () => {
  let repository: PokeApiPokemonRepository;
  beforeEach(() => {
    repository = new PokeApiPokemonRepository();
    (axios.get as jest.Mock).mockResolvedValue({});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemon", () => {
    it("should return a Pokemon entity", async () => {
      await repository.getPokemon("pikachu");
    });
  });
});

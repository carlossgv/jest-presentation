import PokeApiPokemonRepository from "../../infra/pokeapi/pokeapi-pokemon.repository";
import GetPokemonEvolutionChainUseCase from "./get-pokemon-evolution-chain.use-case";
import GetPokemonUseCase from "./get-pokemon.use-case";

const pokemonRepository = new PokeApiPokemonRepository();
const getPokemonUseCase = new GetPokemonUseCase(pokemonRepository);
const getPokemonEvolutionChainUseCase = new GetPokemonEvolutionChainUseCase(
  getPokemonUseCase,
  pokemonRepository,
);

export default getPokemonEvolutionChainUseCase;

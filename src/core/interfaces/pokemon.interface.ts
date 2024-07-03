import Pokemon from "../entities/pokemon.entity";

export default interface IPokemonRepository {
  getPokemonEvolutionChain: (name: string) => Promise<string[]>;
  getPokemon: (name: string) => Promise<Pokemon>;
}

import Pokemon from "../entities/pokemon.entity";
import IPokemonRepository from "../interfaces/pokemon.interface";
import GetPokemonUseCase from "./get-pokemon.use-case";

export default class GetPokemonEvolutionChainUseCase {
  constructor(
    private getPokemonUseCase: GetPokemonUseCase,
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute(name: string): Promise<Pokemon[]> {
    const evolutionChain =
      await this.pokemonRepository.getPokemonEvolutionChain(name);

    const pokemons = await Promise.all(
      evolutionChain.map((pokemonName) =>
        this.getPokemonUseCase.execute(pokemonName),
      ),
    );

    return pokemons;
  }
}

import Pokemon from "../entities/pokemon.entity";
import IPokemonRepository from "../interfaces/pokemon.interface";

export default class GetPokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(name: string): Promise<Pokemon> {
   return await this.pokemonRepository.getPokemon(name);
    
  }
}

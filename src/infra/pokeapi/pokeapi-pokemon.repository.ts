import axios from "axios";
import Pokemon from "../../core/entities/pokemon.entity";
import IPokemonRepository from "../../core/interfaces/pokemon.interface";
import PokeApiSpecies from "./pokeapi-species.type";
import { PokeApiChainLink, PokeApiEvolutionChain } from "./pokeapi-evolution-chain.type";
import PokeApiPokemon from "./pokeapi-pokemon.type";

export default class PokeApiPokemonRepository implements IPokemonRepository {
  async getPokemonEvolutionChain(name: string): Promise<string[]> {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const speciesData = await axios.get<PokeApiSpecies>(speciesUrl);

    const evolutionChainUrl = speciesData.data.evolution_chain.url;
    const response = await axios.get<PokeApiEvolutionChain>(evolutionChainUrl);

    return this.getEvolutionsFromChain(response.data.chain);
  }

  private getEvolutionsFromChain(chain: PokeApiChainLink): string[] {
    const evolutions = [];
    let currentChainLink = chain;
    while (currentChainLink) {
      evolutions.push(currentChainLink.species.name);
      currentChainLink = currentChainLink.evolves_to[0];
    }

    return evolutions;
  }

  async getPokemon(name: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokemonData = await axios.get<PokeApiPokemon>(url);

    return new Pokemon(
      pokemonData.data.name,
      pokemonData.data.types.map((type) => type.type.name),
    );
  }
}

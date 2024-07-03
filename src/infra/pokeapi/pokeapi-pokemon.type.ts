type PokeApiPokemon = {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    }
  }[]
}

export default PokeApiPokemon;

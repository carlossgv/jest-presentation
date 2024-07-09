import getPokemonEvolutionChainUseCase from "./core/use-cases";

const pokemonName = process.argv[2];

getPokemonEvolutionChainUseCase.execute(pokemonName).then((pokemons) => {
  console.log(`The evolution chain of ${pokemonName} is:`);
  pokemons.forEach((pokemon) => {
    console.log(pokemon.getData());
  });
});

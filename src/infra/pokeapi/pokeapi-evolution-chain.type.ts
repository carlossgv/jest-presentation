type PokeApiEvolutionChain = {
  chain: PokeApiChainLink;
};

type PokeApiChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: PokeApiChainLink[];
};

export default PokeApiEvolutionChain;

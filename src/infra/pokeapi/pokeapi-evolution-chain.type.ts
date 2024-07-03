export type PokeApiEvolutionChain = {
  chain: PokeApiChainLink;
};

export type PokeApiChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: PokeApiChainLink[];
};

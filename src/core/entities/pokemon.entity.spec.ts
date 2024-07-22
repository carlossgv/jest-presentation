import Pokemon from "./pokemon.entity";

describe("Pokemon Entity", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  // describe("constructor", () => {})
  describe("getData", () => {
    it.each([
      {
        name: "pikachu",
        types: ["electric"],
        expected: "Pikachu - Type(s): electric",
      },
      {
        name: "bulbasaur",
        types: ["grass", "poison"],
        expected: "Bulbasaur - Type(s): grass, poison",
      },
      {
        name: "charmander",
        types: ["fire"],
        expected: "Charmander - Type(s): fire",
      },
    ])("should return the correct data for $name", (data) => {
      // Arrange
      const pokemon = new Pokemon(data.name, data.types);

      // Action
      const result = pokemon.getData();

      // Assert
      expect(result).toBe(data.expected);
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, "getData");
    });
  });
});

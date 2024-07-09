import Pokemon from "./pokemon.entity";

describe("Pokemon", () => {
  describe("constructor", () => {
    it("should create a new Pokemon instance", () => {
      const pokemon = new Pokemon("pikachu", ["electric"]);
      expect(pokemon).toBeInstanceOf(Pokemon);
      expect(pokemon["name"]).toBe("pikachu");
      expect(pokemon["types"]).toEqual(["electric"]);
    });


  });

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
    ])(
      "should retrieve the name and types of $name",
      ({ name, types, expected }) => {
        const pokemon = new Pokemon(name, types);
        expect(pokemon.getData()).toBe(expected);
      },
    );

    })
});

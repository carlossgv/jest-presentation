export default class Pokemon {
  private name: string;
  private types: string[];
  constructor(name: string, types: string[]) {
    this.name = name;
    this.types = types;
  }

  getData() {
    const upperCaseName =
      this.name.charAt(0).toUpperCase() + this.name.slice(1);
    return `${upperCaseName} - Type(s): ${this.types.join(", ")}`;
  }
}

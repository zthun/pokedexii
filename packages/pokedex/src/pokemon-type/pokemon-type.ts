export enum ZPokemonType {
  Unknown = 'unknown',
  Normal = 'normal',
  Fighting = 'fighting',
  Flying = 'flying',
  Poison = 'poison',
  Ground = 'ground',
  Rock = 'rock',
  Bug = 'bug',
  Ghost = 'ghost',
  Steel = 'steel',
  Fire = 'fire',
  Water = 'water',
  Grass = 'grass',
  Electric = 'electric',
  Psychic = 'psychic',
  Ice = 'ice',
  Dragon = 'dragon',
  Dark = 'dark',
  Fairy = 'fairy',
  Shadow = 'shadow'
}

export interface IZPokemonType {
  name: ZPokemonType;

  doubleDamageFrom: ZPokemonType[];
  doubleDamageTo: ZPokemonType[];
  halfDamageFrom: ZPokemonType[];
  halfDamageTo: ZPokemonType[];
  noDamageFrom: ZPokemonType[];
  noDamageTo: ZPokemonType[];
}

export class ZPokemonTypeBuilder {
  private _type: IZPokemonType;

  public constructor() {
    this._type = {
      name: ZPokemonType.Unknown,
      doubleDamageFrom: [],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: [],
      noDamageFrom: [],
      noDamageTo: []
    };
  }

  public name(type: ZPokemonType) {
    this._type.name = type;
    return this;
  }

  public doubleDamageFrom(type: ZPokemonType[]) {
    this._type.doubleDamageFrom = type;
    return this;
  }

  public doubleDamageTo(type: ZPokemonType[]) {
    this._type.doubleDamageTo = type;
    return this;
  }

  public halfDamageFrom(type: ZPokemonType[]) {
    this._type.halfDamageFrom = type;
    return this;
  }

  public halfDamageTo(type: ZPokemonType[]) {
    this._type.halfDamageTo = type;
    return this;
  }

  public noDamageFrom(type: ZPokemonType[]) {
    this._type.noDamageFrom = type;
    return this;
  }

  public noDamageTo(type: ZPokemonType[]) {
    this._type.noDamageTo = type;
    return this;
  }
  public ground() {
    return this.name(ZPokemonType.Ground)
      .doubleDamageFrom([ZPokemonType.Water, ZPokemonType.Grass, ZPokemonType.Ice])
      .doubleDamageTo([
        ZPokemonType.Poison,
        ZPokemonType.Rock,
        ZPokemonType.Steel,
        ZPokemonType.Fire,
        ZPokemonType.Electric
      ])
      .halfDamageFrom([ZPokemonType.Poison, ZPokemonType.Rock])
      .halfDamageTo([ZPokemonType.Bug, ZPokemonType.Grass])
      .noDamageFrom([ZPokemonType.Electric])
      .noDamageTo([ZPokemonType.Flying]);
  }

  public electric() {
    return this.name(ZPokemonType.Electric)
      .doubleDamageFrom([ZPokemonType.Ground])
      .doubleDamageTo([ZPokemonType.Flying, ZPokemonType.Water])
      .halfDamageFrom([ZPokemonType.Flying, ZPokemonType.Steel, ZPokemonType.Electric])
      .halfDamageTo([ZPokemonType.Grass, ZPokemonType.Electric, ZPokemonType.Dragon])
      .noDamageTo([ZPokemonType.Ground]);
  }

  public build(): IZPokemonType {
    return structuredClone(this._type);
  }
}

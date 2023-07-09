import { IZPokedexNamedResource } from '../pokedex-resource/pokedex-named-resource';

export enum ZType {
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

export interface IZType extends IZPokedexNamedResource<ZType> {
  doubleDamageFrom: ZType[];
  doubleDamageTo: ZType[];
  halfDamageFrom: ZType[];
  halfDamageTo: ZType[];
  noDamageFrom: ZType[];
  noDamageTo: ZType[];
}

export class ZTypeBuilder {
  private _type: IZType;

  public constructor() {
    this._type = {
      name: ZType.Unknown,
      doubleDamageFrom: [],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: [],
      noDamageFrom: [],
      noDamageTo: []
    };
  }

  public name(type: ZType) {
    this._type.name = type;
    return this;
  }

  public doubleDamageFrom(type: ZType[]) {
    this._type.doubleDamageFrom = type;
    return this;
  }

  public doubleDamageTo(type: ZType[]) {
    this._type.doubleDamageTo = type;
    return this;
  }

  public halfDamageFrom(type: ZType[]) {
    this._type.halfDamageFrom = type;
    return this;
  }

  public halfDamageTo(type: ZType[]) {
    this._type.halfDamageTo = type;
    return this;
  }

  public noDamageFrom(type: ZType[]) {
    this._type.noDamageFrom = type;
    return this;
  }

  public noDamageTo(type: ZType[]) {
    this._type.noDamageTo = type;
    return this;
  }

  public ground() {
    return this.name(ZType.Ground)
      .doubleDamageFrom([ZType.Water, ZType.Grass, ZType.Ice])
      .doubleDamageTo([ZType.Poison, ZType.Rock, ZType.Steel, ZType.Fire, ZType.Electric])
      .halfDamageFrom([ZType.Poison, ZType.Rock])
      .halfDamageTo([ZType.Bug, ZType.Grass])
      .noDamageFrom([ZType.Electric])
      .noDamageTo([ZType.Flying]);
  }

  public build(): IZType {
    return structuredClone(this._type);
  }
}

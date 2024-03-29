import { IZResource } from '../resource/resource';

export enum ZType {
  Bug = 'bug',
  Dark = 'dark',
  Dragon = 'dragon',
  Electric = 'electric',
  Fairy = 'fairy',
  Fighting = 'fighting',
  Fire = 'fire',
  Flying = 'flying',
  Ghost = 'ghost',
  Grass = 'grass',
  Ground = 'ground',
  Ice = 'ice',
  Normal = 'normal',
  Poison = 'poison',
  Psychic = 'psychic',
  Rock = 'rock',
  Shadow = 'shadow',
  Steel = 'steel',
  Unknown = 'unknown',
  Water = 'water'
}

export interface IZType extends IZResource<ZType> {
  doubleDamageFrom: ZType[];
  doubleDamageTo: ZType[];
  halfDamageFrom: ZType[];
  halfDamageTo: ZType[];
  noDamageFrom: ZType[];
  noDamageTo: ZType[];
  artwork: string;
}

export class ZTypeBuilder {
  private _type: IZType;

  public constructor() {
    this._type = {
      id: 0,
      name: ZType.Unknown,
      doubleDamageFrom: [],
      doubleDamageTo: [],
      halfDamageFrom: [],
      halfDamageTo: [],
      noDamageFrom: [],
      noDamageTo: [],
      artwork: '/svg/normal.svg'
    };
  }

  public id(id: number) {
    this._type.id = id;
    return this;
  }

  public name(type: ZType) {
    this._type.name = type;
    this._type.artwork = `/svg/${type}.svg`;
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

  public electric() {
    return this.id(13)
      .name(ZType.Electric)
      .doubleDamageFrom([ZType.Ground])
      .doubleDamageTo([ZType.Flying, ZType.Water])
      .halfDamageFrom([ZType.Flying, ZType.Steel, ZType.Electric])
      .halfDamageTo([ZType.Grass, ZType.Electric])
      .noDamageTo([ZType.Ground]);
  }

  public rock() {
    return this.id(6)
      .name(ZType.Rock)
      .doubleDamageFrom([ZType.Fighting, ZType.Ground, ZType.Steel, ZType.Water, ZType.Grass])
      .doubleDamageTo([ZType.Flying, ZType.Bug, ZType.Fire, ZType.Ice])
      .halfDamageFrom([ZType.Normal, ZType.Flying, ZType.Poison, ZType.Fire])
      .halfDamageTo([ZType.Fighting, ZType.Ground, ZType.Steel]);
  }

  public water() {
    return this.id(11)
      .name(ZType.Water)
      .doubleDamageFrom([ZType.Grass, ZType.Electric])
      .doubleDamageTo([ZType.Ground, ZType.Rock, ZType.Fire])
      .halfDamageFrom([ZType.Steel, ZType.Fire, ZType.Water, ZType.Ice])
      .halfDamageTo([ZType.Water, ZType.Grass, ZType.Dragon]);
  }

  public ground() {
    return this.id(5)
      .name(ZType.Ground)
      .doubleDamageFrom([ZType.Water, ZType.Grass, ZType.Ice])
      .doubleDamageTo([ZType.Poison, ZType.Rock, ZType.Steel, ZType.Fire, ZType.Electric])
      .halfDamageFrom([ZType.Poison, ZType.Rock])
      .halfDamageTo([ZType.Bug, ZType.Grass])
      .noDamageFrom([ZType.Electric])
      .noDamageTo([ZType.Flying]);
  }

  public fire() {
    return this.id(10)
      .name(ZType.Fire)
      .doubleDamageFrom([ZType.Ground, ZType.Rock, ZType.Water])
      .doubleDamageTo([ZType.Bug, ZType.Steel, ZType.Grass, ZType.Ice])
      .halfDamageFrom([ZType.Bug, ZType.Steel, ZType.Fire, ZType.Grass, ZType.Ice, ZType.Fairy])
      .halfDamageTo([ZType.Rock, ZType.Fire, ZType.Water, ZType.Dragon]);
  }

  public flying() {
    return this.id(3)
      .name(ZType.Flying)
      .doubleDamageFrom([ZType.Rock, ZType.Electric, ZType.Ice])
      .doubleDamageTo([ZType.Fighting, ZType.Bug, ZType.Grass])
      .halfDamageFrom([ZType.Fighting, ZType.Bug, ZType.Grass])
      .halfDamageTo([ZType.Rock, ZType.Steel, ZType.Electric])
      .noDamageFrom([ZType.Ground]);
  }

  public build(): IZType {
    return structuredClone(this._type);
  }
}

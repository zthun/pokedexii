import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZPokemonStat } from './pokemon-stat';
import { ZPokemonType } from './pokemon-type';

/**
 * Represents information about a pokemon.
 */
export interface IZPokemon {
  /**
   * The id number.
   *
   * This actually varies from game to game, so it is not
   * a reliable source to identify a pokemon.  Use the
   * name instead.
   */
  id: number;

  /**
   * The pokemon name.
   *
   * This is normally lower case.
   */
  name: string;

  /**
   * The stat list for the pokemon.
   */
  stats: {
    hp: IZPokemonStat;
    attack: IZPokemonStat;
    defense: IZPokemonStat;
    specialAttack: IZPokemonStat;
    specialDefense: IZPokemonStat;
    speed: IZPokemonStat;
  };

  /**
   * The url for the pokemon artwork.
   */
  artwork?: string;

  /**
   * The types for this pokemon.
   */
  types?: ZPokemonType[];
}

/**
 * Represents a builder for pokemon information.
 */
export class ZPokemonBuilder {
  private _pokemon: IZPokemon;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._pokemon = {
      id: 0,
      name: 'missingno',
      stats: {
        hp: { base: 0, effort: 0 },
        attack: { base: 0, effort: 0 },
        defense: { base: 0, effort: 0 },
        specialAttack: { base: 0, effort: 0 },
        specialDefense: { base: 0, effort: 0 },
        speed: { base: 0, effort: 0 }
      }
    };
  }

  /**
   * Who's that pokemon?  Sets the needed information.
   *
   * @param id -
   *        The pokemon id.
   * @param name -
   *        The pokemon name.
   *
   * @returns
   *        A reference to this object.
   */
  public who(id: number, name: string): this {
    this._pokemon.id = id;
    this._pokemon.name = name;
    return this.art(id);
  }

  /**
   * Sets the url for the pokemon artwork.
   *
   * @param artwork -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public artwork(artwork: string): this {
    this._pokemon.artwork = artwork;
    return this;
  }

  /**
   * Builds the artwork from the standard github content.
   *
   * @param id -
   *        The id number of the pokemon.
   *
   * @returns
   *        This object.
   */
  public art(id: number): this {
    const url = new ZUrlBuilder('https', 'raw.githubusercontent.com')
      .append('PokeAPI')
      .append('sprites')
      .append('master')
      .append('sprites')
      .append('pokemon')
      .append('other')
      .append('official-artwork')
      .append(`${id}.png`)
      .build();

    return this.artwork(url);
  }

  /**
   * Sets the pokemon types.
   *
   * @param types -
   *        The types to set.
   *
   * @returns
   *        This object.
   */
  public types(types: ZPokemonType[]) {
    this._pokemon.types = types;
    return this;
  }

  /**
   * Adds an individual type.
   *
   * @param type -
   *        The type to add.
   *
   * @returns
   *        This object.
   */
  public type(type: ZPokemonType) {
    const types = this._pokemon.types || [];
    return this.types([...types, type]);
  }

  /**
   * Sets the hp stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public hp(base: number, effort = 0) {
    this._pokemon.stats.hp = { base, effort };
    return this;
  }

  /**
   * Sets the attack stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public attack(base: number, effort = 0) {
    this._pokemon.stats.attack = { base, effort };
    return this;
  }

  /**
   * Sets the defense stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public defense(base: number, effort = 0) {
    this._pokemon.stats.defense = { base, effort };
    return this;
  }

  /**
   * Sets the special attack stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public specialAttack(base: number, effort = 0) {
    this._pokemon.stats.specialAttack = { base, effort };
    return this;
  }

  /**
   * Sets the special defense stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public specialDefense(base: number, effort = 0) {
    this._pokemon.stats.specialDefense = { base, effort };
    return this;
  }

  /**
   * Sets the speed stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public speed(base: number, effort = 0) {
    this._pokemon.stats.speed = { base, effort };
    return this;
  }

  /**
   * Sets Bulbasaur's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public bulbasaur() {
    return this.who(1, 'bulbasaur')
      .type(ZPokemonType.Grass)
      .type(ZPokemonType.Poison)
      .hp(45)
      .attack(49)
      .defense(49)
      .specialAttack(65, 1)
      .specialDefense(65)
      .speed(45);
  }

  /**
   * Sets Charmander's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charmander() {
    return this.who(4, 'charmander')
      .type(ZPokemonType.Fire)
      .hp(39)
      .attack(52)
      .defense(43)
      .specialAttack(60)
      .specialDefense(50)
      .speed(65, 1);
  }

  /**
   * Sets Squirtle's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public squirtle() {
    return this.who(7, 'squirtle')
      .type(ZPokemonType.Water)
      .hp(44)
      .attack(48)
      .defense(65, 1)
      .specialAttack(50)
      .specialDefense(64)
      .speed(43);
  }

  /**
   * Sets Pikachu's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public pikachu() {
    return this.who(25, 'pikachu')
      .type(ZPokemonType.Electric)
      .hp(35)
      .attack(55)
      .defense(40)
      .specialAttack(50)
      .specialDefense(50)
      .speed(90, 2);
  }

  /**
   * Returns a deep copy of the built pokemon.
   *
   * @returns
   *        A deep copy of the built pokemon.
   */
  public build(): IZPokemon {
    return JSON.parse(JSON.stringify(this._pokemon));
  }
}

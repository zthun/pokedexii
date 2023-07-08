import { ZUrlBuilder } from '@zthun/webigail-url';
import { ZPokemonType } from './pokemon-type';

/**
 * Represents information about a pokemon.
 */
export interface IZPokemon {
  /**
   * The id number.
   */
  id: number;

  /**
   * The pokemon name.
   *
   * This is normally lower case.
   */
  name: string;

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
      name: 'missingno'
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
    return this.who(1, 'bulbasaur').type(ZPokemonType.Grass).type(ZPokemonType.Poison);
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
    return this.who(4, 'charmander').type(ZPokemonType.Fire);
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
    return this.who(7, 'squirtle').type(ZPokemonType.Water);
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
    return this.who(25, 'pikachu').type(ZPokemonType.Electric);
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

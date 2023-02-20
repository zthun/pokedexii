import { last } from 'lodash';
import { IZPokemonSprites, ZPokemonSpritesBuilder } from './pokemon-sprites';

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
   * A sprite sheet for the pokemon.
   */
  sprites: IZPokemonSprites;
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
      sprites: new ZPokemonSpritesBuilder().id(0).build()
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
    this._pokemon.sprites = new ZPokemonSpritesBuilder().id(id).build();
    return this;
  }

  /**
   * Auto generates the id and sprite sheets based on the url.
   *
   * The pokemon api returns a list with the pokemon name and url.
   * You can use this method to detect the id and sprite sheet.
   *
   * @param name -
   *        The pokemon name.
   * @param url -
   *        The endpoint url of the pokemon to retrieve.
   */
  public generate(name: string, url: string) {
    const tokens = url.split('/').filter((t) => !!t);
    const id = +last(tokens)!;
    return this.who(id, name);
  }

  /**
   * Sets Bulbasaur's information.
   *
   * @returns
   *        A reference to this object.
   */
  public bulbasaur = this.who.bind(this, 1, 'bulbasaur');

  /**
   * Sets Charmander's information.
   *
   * @returns
   *        A reference to this object.
   */
  public charmander = this.who.bind(this, 4, 'charmander');

  /**
   * Sets Squirtle's information.
   *
   * @returns
   *        A reference to this object.
   */
  public squirtle = this.who.bind(this, 7, 'squirtle');

  /**
   * Sets Pikachu's information.
   *
   * @returns
   *        A reference to this object.
   */
  public pikachu = this.who.bind(this, 25, 'pikachu');

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

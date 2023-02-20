/**
 * Represents the collection of sprites.
 */
export interface IZPokemonSprites {
  /**
   * Back (main).
   */
  back_default?: string;
  /**
   * Back (female).
   */
  back_female?: string;
  /**
   * Back (shiny).
   */
  back_shiny?: string;
  /**
   * Back (shiny + female).
   */
  back_shiny_female?: string;
  /**
   * Front (main).
   */
  front_default?: string;
  /**
   * Front (female).
   */
  front_female?: string;
  /**
   * Front (shiny).
   */
  front_shiny?: string;
  /**
   * Front (shiny + female).
   */
  front_shiny_female?: string;
}

/**
 * A sprites builder.
 *
 * The main purpose of this builder instead of using the api is to reduce the load on the
 * pokemon api (as requested), and we can just build out the url endpoints ourselves.
 */
export class ZPokemonSpritesBuilder {
  /**
   * The endpoint of where the sprites live.
   *
   * Note that not all pokemon have front image sprites.
   */
  public static Endpoint = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  private _sprites: IZPokemonSprites;

  /**
   * Initialize a new instance of this object.
   */
  public constructor() {
    this._sprites = {};
  }

  /**
   * Builds the sprite list by the pokemon's id.
   *
   * @param id -
   *        The id of the pokemon to generate the sprite
   *        endpoints for.
   *
   * @returns
   *        A reference to this object.
   */
  public id(id: number): this {
    this._sprites = {
      back_default: `${ZPokemonSpritesBuilder.Endpoint}/back/${id}.png`,
      back_female: `${ZPokemonSpritesBuilder.Endpoint}/back/female/${id}.png`,
      back_shiny: `${ZPokemonSpritesBuilder.Endpoint}/back/shiny/${id}.png`,
      back_shiny_female: `${ZPokemonSpritesBuilder.Endpoint}/back/shiny/female/${id}.png`,
      front_default: `${ZPokemonSpritesBuilder.Endpoint}/${id}.png`,
      front_female: `${ZPokemonSpritesBuilder.Endpoint}/female/${id}.png`,
      front_shiny: `${ZPokemonSpritesBuilder.Endpoint}/shiny/${id}.png`,
      front_shiny_female: `${ZPokemonSpritesBuilder.Endpoint}/shiny/female/${id}.png`
    };

    return this;
  }

  /**
   * Returns a deep copy of the existing sprite endpoints.
   *
   * @returns
   *        A deep copy of the existing sprite endpoints.
   */
  public build(): IZPokemonSprites {
    return JSON.parse(JSON.stringify(this._sprites));
  }
}

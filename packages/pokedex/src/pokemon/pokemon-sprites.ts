/**
 * Represents the collection of sprites.
 */
export interface IZPokemonSprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

/**
 * A sprites builder.
 *
 * The main purpose of this builder instead of using the api is to reduce the load on the
 * pokemon api (as requested), and we can just build out the url endpoints ourselves.
 */
export class ZPokemonSpritesBuilder {
  public static Endpoint = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  private _sprites: IZPokemonSprites;

  public constructor() {
    this._sprites = {};
  }

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

  public build(): IZPokemonSprites {
    return JSON.parse(JSON.stringify(this._sprites));
  }
}

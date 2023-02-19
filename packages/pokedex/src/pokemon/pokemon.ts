import { last } from 'lodash';
import { IZPokemonSprites, ZPokemonSpritesBuilder } from './pokemon-sprites';

export interface IZPokemon {
  id: number;
  name: string;
  sprites: IZPokemonSprites;
  url?: string;
}

export class ZPokemonBuilder {
  private _pokemon: IZPokemon;

  public constructor() {
    const pikachu = 25;
    this._pokemon = {
      id: pikachu,
      name: 'pikachu',
      sprites: new ZPokemonSpritesBuilder().id(pikachu).build()
    };
  }

  public who(id: number, name: string): this {
    this._pokemon.id = id;
    this._pokemon.name = name;
    return this;
  }

  /**
   * Auto generates the id and sprite sheets based on the url.
   */
  public generate(url?: string) {
    const tokens = url?.split('/').filter((t) => !!t);
    this._pokemon.id = +(last(tokens) || NaN);
    this._pokemon.sprites = new ZPokemonSpritesBuilder().id(this._pokemon.id).build();
    return this;
  }

  // Testing resources
  public bulbasaur = this.who.bind(this, 1, 'bulbasaur');
  public charmander = this.who.bind(this, 4, 'charmander');
  public squirtle = this.who.bind(this, 7, 'squirtle');

  public copy(other: IZPokemon): this {
    this._pokemon = JSON.parse(JSON.stringify(other));
    return this;
  }

  public build(): IZPokemon {
    return JSON.parse(JSON.stringify(this._pokemon));
  }
}

import { last } from 'lodash';
import { IZPokemonSprites, ZPokemonSpritesBuilder } from './pokemon-sprites';

export interface IZPokemon {
  id: number;
  name: string;
  sprites: IZPokemonSprites;
}

export class ZPokemonBuilder {
  private _pokemon: IZPokemon;

  public constructor() {
    this._pokemon = {
      id: 0,
      name: 'missingno',
      sprites: new ZPokemonSpritesBuilder().id(0).build()
    };
  }

  public who(id: number, name: string): this {
    this._pokemon.id = id;
    this._pokemon.name = name;
    this._pokemon.sprites = new ZPokemonSpritesBuilder().id(id).build();
    return this;
  }

  /**
   * Auto generates the id and sprite sheets based on the url.
   */
  public generate(name: string, url: string) {
    const tokens = url.split('/').filter((t) => !!t);
    const id = +last(tokens)!;
    return this.who(id, name);
  }

  // Testing resources
  public bulbasaur = this.who.bind(this, 1, 'bulbasaur');
  public charmander = this.who.bind(this, 4, 'charmander');
  public squirtle = this.who.bind(this, 7, 'squirtle');
  public pikachu = this.who.bind(this, 25, 'pikachu');

  public build(): IZPokemon {
    return JSON.parse(JSON.stringify(this._pokemon));
  }
}

import { IZPokemonSprites, ZPokemonSpritesBuilder } from './pokemon-sprites';

export interface IZPokemon {
  id: number;
  name: string;
  sprites: IZPokemonSprites;
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

  // Testing resources
  public bulbasaur = this.who.bind(this, 1, 'bulbasaur');
  public charmander = this.who.bind(this, 4, 'charmander');
  public squirtle = this.who.bind(this, 7, 'squirtle');

  public build(): IZPokemon {
    return JSON.parse(JSON.stringify(this._pokemon));
  }
}

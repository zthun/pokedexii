/* istanbul ignore file -- @preserve */

import { IPokeApiPage } from './poke-api-page';
import { IPokeApiPokemon } from './poke-api-pokemon';

import { Pokedex } from 'pokeapi-js-wrapper';

export interface IPokeApi {
  pokemons(): Promise<IPokeApiPage>;
  pokemon(name: string): Promise<IPokeApiPokemon>;
}

export class ZPokeApi implements IPokeApi {
  private _pokedex = new Pokedex();

  public pokemons(): Promise<IPokeApiPage> {
    return this._pokedex.getPokemonsList();
  }

  public pokemon(name: string): Promise<IPokeApiPokemon> {
    return this._pokedex.getPokemonByName(name);
  }
}

import { IZHttpService, ZHttpRequestBuilder } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import { IZDataSource } from '../source/data-source';

import { ZDataSourceAsync } from 'src/source/data-source-async';
import { IZDataRequest } from '../source/data-request';
import { IZPokemon, ZPokemonBuilder } from './pokemon';

export interface IZPokemonService {
  list(request: IZDataRequest): Promise<IZPokemon[]>;
  get(idOrName: number | string): Promise<IZPokemon>;
}

export class ZPokemonServiceHttp implements IZPokemonService {
  public static readonly Endpoint = 'https://pokeapi.co/api/v2/pokemon';

  // Due to the request of the pokemon api, this request results in
  // a static JSON payload of less than 200k.  To reduce the load on
  // the pokemon api, we can just cache all of the pokemon in this service.
  // A better way to do this would be to prefetch and set a copy on a backend
  // that stores it locally, and we can invoke that api instead, but
  // this will suffice for now.
  private _all: IZDataSource<IZPokemon>;

  public constructor(private _http: IZHttpService) {
    this._all = new ZDataSourceAsync(this._prefetch());
  }

  public async list(request: IZDataRequest): Promise<IZPokemon[]> {
    return this._all.retrieve(request);
  }

  public async get(idOrName: number | string): Promise<IZPokemon> {
    const url = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).append(`${idOrName}`).build();
    const request = new ZHttpRequestBuilder().get().url(url).build();
    const { data } = await this._http.request(request);
    return data;
  }

  private async _prefetch(): Promise<IZPokemon[]> {
    let url = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', '1').build();
    let request = new ZHttpRequestBuilder().get().url(url).build();
    const count = await this._http.request<{ count: number }>(request);

    url = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', `${count.data.count}`).build();
    request = new ZHttpRequestBuilder().get().url(url).build();
    const { data } = await this._http.request<{ results: IZPokemon[] }>(request);
    const pokemon = data.results;
    return pokemon.map((p) => new ZPokemonBuilder().copy(p).generate(p.url).build());
  }
}

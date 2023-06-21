import {
  IZDataRequest,
  IZDataSource,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder
} from '@zthun/helpful-query';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZPokemon, ZPokemonBuilder } from './pokemon';

/**
 * Represents a service that retrieves data from the pokemon api.
 */
export interface IZPokemonService {
  /**
   * Gets the total count of pokemon given a filter.
   *
   * @param request -
   *        The request query.
   *
   * @returns
   *        The total number of pokemon across pages that
   *        would be returned from list if the request was
   *        made with the first page and an infinite page
   *        size.
   */
  count(request: IZDataRequest): Promise<number>;

  /**
   * Gets a list of pokemon.
   *
   * @param request -
   *        The request query.
   *
   * @returns
   *        A page of pokemon data that conforms to the given
   *        request query.
   */
  list(request: IZDataRequest): Promise<IZPokemon[]>;

  /**
   * Gets information about a single pokemon.
   *
   * @param idOrName -
   *        The id or name of the pokemon.
   *
   * @returns
   *        The pokemon with the given id or name.  Returns
   *        a rejected promise if no such pokemon exists.
   */
  get(idOrName: number | string): Promise<IZPokemon>;
}

/**
 * Represents an implementation of an pokemon service that
 * uses the pokeapi.
 */
export class ZPokemonServiceHttp implements IZPokemonService {
  /**
   * The public endpoint of the pokeapi.
   */
  public static readonly Endpoint = 'https://pokeapi.co/api/v2/pokemon';

  // Due to the request of the pokemon api, this request results in
  // a static JSON payload of less than 200k.  To reduce the load on
  // the pokemon api, we can just cache all of the pokemon in this service.
  // A better way to do this would be to prefetch and set a copy on a backend
  // that stores it locally, and we can invoke that api instead, but
  // this will suffice for now.
  private _all: IZDataSource<IZPokemon>;

  /**
   * Initializes a new instance of this object.
   *
   * @param _http -
   *        The http service that will be responsible for
   *        querying out to the pokeapi endpoint.
   */
  public constructor(private _http: IZHttpService) {
    const search = new ZDataSearchFields<IZPokemon>(['name']);
    const options = new ZDataSourceStaticOptionsBuilder<IZPokemon>().search(search).build();
    this._all = new ZDataSourceStatic(this._prefetch(), options);
  }

  public async count(request: IZDataRequest): Promise<number> {
    return this._all.count(request);
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

  /**
   * Prefetches the pokemon list to cache it in memory.
   *
   * This reduces the load on the pokeapi as requested in their documentation.
   * There are currently around 1200 pokemon so this list is very finite.
   *
   * @returns
   *        A list of every pokemon from the pokemon api.
   */
  private async _prefetch(): Promise<IZPokemon[]> {
    let url = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', '1').build();
    let request = new ZHttpRequestBuilder().get().url(url).build();
    const count = await this._http.request<{ count: number }>(request);

    url = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', `${count.data.count}`).build();
    request = new ZHttpRequestBuilder().get().url(url).build();
    const { data } = await this._http.request<{ results: { name: string; url: string }[] }>(request);
    const pokemon = data.results;
    return pokemon.map((p) => new ZPokemonBuilder().generate(p.name, p.url).build());
  }
}

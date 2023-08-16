import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { sleep } from '@zthun/helpful-fn';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZHttpServiceToken } from '@zthun/webigail-nest';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiResourcePage } from './resource-page';

export const ZPokedexResourceServiceToken = Symbol();

export interface IZPokedexResourceService {
  populate(collection: string): Promise<void>;
}

@Injectable()
export class ZPokedexResourceService implements IZPokedexResourceService {
  public static readonly PokeApiUrl = 'https://pokeapi.co/api/v2';

  public constructor(
    @Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZHttpServiceToken) private _http: IZHttpService
  ) {}

  public async populate<T>(collection: string) {
    const size = 50;
    const pageUrl = new ZUrlBuilder()
      .parse(ZPokedexResourceService.PokeApiUrl)
      .append(collection)
      .param('limit', '10000')
      .build();
    const resourceListRequest = new ZHttpRequestBuilder().url(pageUrl).get().timeout(10000).build();

    const { data: page } = await this._http.request<IPokeApiResourcePage>(resourceListRequest);
    const { count, results: resourceList } = page;

    let resources: T[] = [];

    for (let i = 0; i < count; i += size) {
      const batch = resourceList.slice(i, i + size);
      const results = await Promise.all(
        batch.map(async (r) => {
          const resourceRequest = new ZHttpRequestBuilder().url(r.url).get().timeout(10000).build();
          const { data: resource } = await this._http.request<T>(resourceRequest);
          return resource;
        })
      );
      resources = resources.concat(results);
      sleep(500);
    }

    await this._dal.create(collection, resources);
  }
}

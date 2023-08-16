import { Inject, Injectable, Logger } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { sleep } from '@zthun/helpful-fn';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZHttpServiceToken } from '@zthun/webigail-nest';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiResource, PokeApiUrl } from './resource';

interface IPokeApiResourcePage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiResource[];
}

export const ZPokedexResourceServiceToken = Symbol();

export interface IZPokedexResourceService {
  populate(collection: string): Promise<void>;
}

@Injectable()
export class ZPokedexResourceService implements IZPokedexResourceService {
  private readonly _logger = new Logger('ZPokedexResourceService');

  public constructor(
    @Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZHttpServiceToken) private _http: IZHttpService
  ) {}

  public static pageEndpoint(collection: string) {
    return new ZUrlBuilder().parse(PokeApiUrl).append(collection).param('limit', '10000').build();
  }

  public async _populate<T>(collection: string) {
    const size = 200;
    const pageUrl = ZPokedexResourceService.pageEndpoint(collection);
    const resourceListRequest = new ZHttpRequestBuilder().url(pageUrl).get().timeout(10000).build();

    const currentCount = await this._dal.count(collection);

    if (currentCount > 0) {
      return;
    }

    this._logger.log(`Populating ${collection}`);

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
      sleep(1000);
    }

    await this._dal.create(collection, resources);

    this._logger.log(`Population of ${collection} successful`);
  }

  public async populate(collection: string) {
    try {
      await this._populate(collection);
    } catch (e) {
      this._logger.error(e);
    }
  }
}

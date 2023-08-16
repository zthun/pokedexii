import { Inject, Injectable, Logger } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { sleep } from '@zthun/helpful-fn';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZHttpServiceToken } from '@zthun/webigail-nest';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiResource, IPokeApiResourcePage, PokeApiUrl } from './resource';

export const ZPokedexResourceServiceToken = Symbol();

export interface IZPokedexResourceService {
  populate(collection: string): Promise<void>;
  seed(): Promise<void>;
}

@Injectable()
export class ZPokedexResourceService implements IZPokedexResourceService {
  private readonly _logger = new Logger(ZPokedexResourceService.name);

  public constructor(
    @Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZHttpServiceToken) private _http: IZHttpService
  ) {}

  public static pageEndpoint(collection: string) {
    return new ZUrlBuilder().parse(PokeApiUrl).append(collection).param('limit', '10000').build();
  }

  private async _doWithRetry<T>(name: string, milliseconds: number, retries: number, fn: () => Promise<T>) {
    let error: any = null;

    for (let attempts = 0; attempts < retries; ++attempts) {
      try {
        const result = await fn();
        return result;
      } catch (e) {
        this._logger.error(`Attempt ${attempts} of retrieving ${name} failed.  Retrying...`);
        error = e;
        await sleep(milliseconds * (attempts + 1));
      }
    }

    const msg = `Unable to retrieve ${name} after ${retries} attempts.  Last error was ${error.message}`;
    throw new Error(msg);
  }

  private async _readAvailableResources(collection: string, milliseconds: number, retries: number) {
    const url = ZPokedexResourceService.pageEndpoint(collection);

    return this._doWithRetry(url, milliseconds, retries, async () => {
      const resourceListRequest = new ZHttpRequestBuilder().url(url).get().timeout(10000).build();
      const { data: page } = await this._http.request<IPokeApiResourcePage>(resourceListRequest);
      return page;
    });
  }

  private async _readResourceData(resource: IPokeApiResource, milliseconds: number, retries: number) {
    const { url } = resource;

    return this._doWithRetry(url, milliseconds, retries, async () => {
      const resourceRequest = new ZHttpRequestBuilder().url(url).get().timeout(10000).build();
      const { data } = await this._http.request<unknown>(resourceRequest);
      return data;
    });
  }

  public async populate(collection: string, size = 200, milliseconds = 1000, retries = 5) {
    this._logger.log(`Populating ${collection}`);

    try {
      const currentCount = await this._dal.count(collection);

      if (currentCount > 0) {
        this._logger.log(`Collection ${collection} already populated with ${currentCount} items.  Skipping`);
        return;
      }

      const { count, results: resourceList } = await this._readAvailableResources(collection, milliseconds, retries);

      let resources: unknown[] = [];

      for (let i = 0; i < count; i += size) {
        const batch = resourceList.slice(i, i + size);
        const results = await Promise.all(batch.map((r) => this._readResourceData(r, milliseconds, retries)));
        resources = resources.concat(results);
        sleep(milliseconds);
      }

      await this._dal.create(collection, resources);

      this._logger.log(`Population of ${collection} successful`);
    } catch (e) {
      this._logger.error(e.message);
    }
  }

  public async seed(): Promise<void> {
    const values = Object.values(ZPokedexCollection);
    this._logger.log('Seeding Pokedex Database');

    for (let i = 0; i < values.length; ++i) {
      const resource = values[i];
      await this.populate(resource);
    }

    this._logger.log('Seeding Completed');
  }
}

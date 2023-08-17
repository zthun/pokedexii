import { IZDataRequest, IZDataSource, IZPage } from '@zthun/helpful-query';
import { IZResource } from '@zthun/pokedex';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';

export interface IZResourceService<T extends IZResource> extends IZDataSource<T> {
  get(idOrName: number | string): Promise<T>;
}

export class ZResourceService<T extends IZResource> implements IZResourceService<T> {
  public constructor(
    private readonly _http: IZHttpService,
    private _name: string
  ) {}

  public async count(): Promise<number> {
    const url = new ZUrlBuilder()
      .api(location)
      .append(this._name)
      .param('page', String(1))
      .param('size', String(1))
      .build();
    const request = new ZHttpRequestBuilder().url(url).get().build();
    const {
      data: { count }
    } = await this._http.request<IZPage<T>>(request);
    return count;
  }

  public async retrieve(req: IZDataRequest): Promise<T[]> {
    let url = new ZUrlBuilder().api(location).append(this._name);

    if (req.page) {
      url = url.param('page', String(req.page));
    }

    if (req.size) {
      url = url.param('size', String(req.size));
    }

    if (req.search) {
      url = url.param('search', String(req.search));
    }

    const request = new ZHttpRequestBuilder().url(url.build()).get().build();
    const {
      data: { data }
    } = await this._http.request<IZPage<T>>(request);
    return data;
  }

  public async get(idOrName: number | string): Promise<T> {
    const url = new ZUrlBuilder().api(location).append(this._name).append(String(idOrName)).build();
    const request = new ZHttpRequestBuilder().url(url).get().timeout(30000).build();
    const { data } = await this._http.request<T>(request);
    return data;
  }
}

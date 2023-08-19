import { IZDataRequest, IZDataSource, IZPage } from '@zthun/helpful-query';
import { IZResource } from '@zthun/pokedex';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/webigail-http';
import { ZUrlBuilder } from '@zthun/webigail-url';

export interface IZResourceService<T extends IZResource> extends IZDataSource<T> {
  get(identification: number | string): Promise<T>;
}

export class ZResourceService<T extends IZResource> implements IZResourceService<T> {
  public constructor(
    private readonly _http: IZHttpService,
    private _name: string
  ) {}

  public api() {
    return new ZUrlBuilder().api(location).append(this._name);
  }

  public request(url: string) {
    return new ZHttpRequestBuilder().url(url).get().timeout(5000);
  }

  public async count(): Promise<number> {
    const url = this.api().page(1).size(1).build();
    const { data: page } = await this._http.request<IZPage<T>>(this.request(url).build());
    return page.count;
  }

  public async retrieve(req: IZDataRequest): Promise<T[]> {
    const url = this.api().page(req.page).size(req.size).search(req.search).build();
    const { data: page } = await this._http.request<IZPage<T>>(this.request(url).build());
    return page.data;
  }

  public async get(identification: number | string): Promise<T> {
    const url = this.api().append(String(identification)).build();
    const { data } = await this._http.request<T>(this.request(url).build());
    return data;
  }
}

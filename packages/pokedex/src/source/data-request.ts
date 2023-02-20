export interface IZDataRequest {
  page?: number;
  size?: number;
  search?: string;
  // TODO: Sort, Filter - Move from works.core into separate library.
}

export class ZDataRequestBuilder {
  private _request: IZDataRequest;

  public constructor() {
    this._request = {};
  }

  public page(page: number): this {
    this._request.page = page;
    return this;
  }

  public size(size: number): this {
    this._request.size = size;
    return this;
  }

  public search(search: string): this {
    this._request.search = search;
    return this;
  }

  public copy(other: IZDataRequest) {
    this._request = JSON.parse(JSON.stringify(other));
    return this;
  }

  public build(): IZDataRequest {
    return JSON.parse(JSON.stringify(this._request));
  }
}

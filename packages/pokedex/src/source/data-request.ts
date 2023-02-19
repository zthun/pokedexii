export interface IZDataRequest {
  page?: number;
  size?: number;
  // TODO: Sort, Filter, Search - Move from works.core into separate library.
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

  public build(): IZDataRequest {
    return JSON.parse(JSON.stringify(this._request));
  }
}

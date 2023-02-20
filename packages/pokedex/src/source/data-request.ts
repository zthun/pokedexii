/**
 * Describes a request for a given set of data.
 */
export interface IZDataRequest {
  /**
   * The page number.
   *
   * This is one based.  Should always default
   * to 1.
   */
  page?: number;
  /**
   * The page size.
   *
   * If not set, it will be up to the consumer
   * to decide the default.
   */
  size?: number;

  /**
   * Search query.
   *
   * How the search is performed is done
   * through the consumer.  You can use a
   * @see IZDataMatch for an example implementation.
   */
  search?: string;

  // TODO: Sort, Filter - Move from works.core into separate library.
}

/**
 * Represents a builder for a data request.
 */
export class ZDataRequestBuilder {
  private _request: IZDataRequest;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._request = {};
  }

  /**
   * Sets the page to retrieve.
   *
   * @param page -
   *        The page number
   *
   * @returns
   *        A reference to this object.
   */
  public page(page: number): this {
    this._request.page = page;
    return this;
  }

  /**
   * Sets the page size.
   *
   * @param size -
   *        The page size.
   *
   * @returns
   *        A reference to this object.
   */
  public size(size: number): this {
    this._request.size = size;
    return this;
  }

  /**
   * Sets the search criteria.
   *
   * @param search -
   *        The search query.
   *
   * @returns
   *        A reference to this object.
   */
  public search(search: string): this {
    this._request.search = search;
    return this;
  }

  /**
   * Copies an existing data request into this object.
   *
   * @param other -
   *        The data request object to copy.
   *
   * @returns
   *        A reference to this object.
   */
  public copy(other: IZDataRequest) {
    this._request = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the currently built request.
   *
   * The returned request will be a deep copy.
   *
   * @returns
   *        The currently built request.
   */
  public build(): IZDataRequest {
    return JSON.parse(JSON.stringify(this._request));
  }
}

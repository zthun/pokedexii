import { IZDataMatch } from './data-match';

/**
 * Represents a data match that forwards to an inner match if the filter is null or undefined.
 */
export class ZDataMatchOptional<TData, TFilter> implements IZDataMatch<TData, TFilter | undefined | null> {
  public constructor(private _match: IZDataMatch<TData, TFilter>) {}

  public match(data: TData, filter: TFilter | undefined | null): boolean {
    if (filter == null) {
      return true;
    }

    return this._match.match(data, filter);
  }
}

import { IZDataMatch } from './data-match';

/**
 * Represents a data match where the data qualifies
 * if it's text representation matches the search string.
 */
export class ZDataSearchText implements IZDataMatch<any, string> {
  public match(data: any, filter: string): boolean {
    const _filter = filter.toUpperCase();
    return `${data}`.toUpperCase().indexOf(_filter) >= 0;
  }
}

/**
 * Represents an object which can match data to a filter or query.
 */
export interface IZDataMatch<TData, TFilter> {
  /**
   * Gets whether the given data matches the given filter.
   *
   * @param data -
   *        The data to check.
   * @param filter -
   *        The filter to match against.
   *
   * @returns
   *        True if the data matches the filter.
   */
  match(data: TData, filter: TFilter): boolean;
}

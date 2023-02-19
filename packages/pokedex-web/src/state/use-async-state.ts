import { DependencyList, useEffect, useState } from 'react';

/**
 * The value that will be set on an ZAsyncDataState when the data is being loaded.
 */
export const ZAsyncLoading = Symbol('loading');

/**
 * An async data state.
 *
 * An async data state can be in one of three possible states:
 * 1.  Loaded
 * 2.  Loading
 * 3.  Error
 */
export type ZAsyncDataState<T> = T | Symbol | Error;

/**
 * A tuple where the first item is the current state of the data and the
 * 2nd item is a refresh function.
 *
 * The refresh function also acts as a setter function to force the
 * use of the data.
 */
export type ZAsyncDataTuple<T> = [ZAsyncDataState<T>, (val?: T) => Promise<any>];

/**
 * Represents a hook to use async data.
 *
 * @param load -
 *        The load method for the data.
 * @param deps -
 *        The dependencies to force a refresh of the data.
 *
 * @returns
 *        A tuple where the first item is the current state of the data and
 *        the 2nd argument is a refresh function to refresh the data.
 *
 */
export function useAsyncState<T>(load: () => Promise<T>, deps: DependencyList = []): ZAsyncDataTuple<T> {
  const [current, setCurrent] = useState<ZAsyncDataState<T>>(ZAsyncLoading);

  const refresh = async (useThisData?: T) => {
    if (useThisData !== undefined) {
      setCurrent(useThisData);
      return;
    }

    try {
      const next = await load();
      setCurrent(next);
    } catch (err) {
      setCurrent(new Error(err.toString()));
    }
  };

  useEffect(() => {
    refresh();
  }, deps);

  return [current, refresh];
}

/**
 * Gets whether data is loading.
 *
 * @param data -
 *        The data to check.
 *
 * @returns
 *        True if the data is in a loading state.
 */
export function isStateLoading<T>(data: ZAsyncDataState<T>): data is Symbol {
  return data === ZAsyncLoading;
}

/**
 * Gets whether data has been loaded.
 *
 * @param data -
 *        The data to check.
 *
 * @returns
 *        True if the data is loaded.
 */
export function isStateLoaded<T>(data: ZAsyncDataState<T>): data is T {
  return !isStateLoading(data) && !isStateErrored(data);
}

/**
 * Gets whether data has errored.
 *
 * @param data -
 *        The data to check.
 *
 * @returns
 *        True if the data is in an error state.
 */
export function isStateErrored<T>(data: ZAsyncDataState<T>): data is Error {
  return data instanceof Error;
}

/**
 * Returns the loaded data.
 *
 * @param data -
 *        The data to retrieve.
 *
 * @returns
 *        This method returns data if it is loaded, or undefined
 *        if it is not.
 */
export function asStateData<T>(data: ZAsyncDataState<T>): T | undefined {
  return isStateLoaded(data) ? data : undefined;
}

/**
 * Returns the data error.
 *
 * @param data -
 *        The data that has possibly errored.
 *
 * @returns
 *        The error that occurred or undefined if the data is
 *        loading or successful.
 */
export function asStateError<T>(data: ZAsyncDataState<T>): Error | undefined {
  return isStateErrored(data) ? data : undefined;
}

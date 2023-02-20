import { useState } from 'react';

export type SetCurrent<T> = ((val: T) => void) | undefined;

/**
 * A type of safe state where the value is used from the props in the case of them being set.
 *
 * Otherwise, an internal set of properties are used.  This is useful in the case that you
 * want to allow properties to control the state of the component, but this functionality is
 * to be optional.
 *
 * @param current -
 *        The current value from the props.  If this is
 *        undefined, then the internal state is used.
 * @param setCurrent -
 *        The mutator method to set the current value.  This can
 *        be undefined, but if it is set, both the internal value and
 *        the prop value are set.
 *
 * @returns
 *        A tuple where the first item is the current state and the 2nd item is a mutator
 *        method to modify the state.
 */
export function useAmbassadorState<T>(
  current: T | undefined,
  setCurrent: SetCurrent<T>
): [T | undefined, (val: T) => void];

/**
 * A type of safe state where the value is used from the props in the case of them being set.
 *
 * Otherwise, an internal set of properties are used.  This is useful in the case that you
 * want to allow properties to control the state of the component, but this functionality is
 * to be optional.
 *
 * @param current -
 *        The current value from the props.  If this is
 *        undefined, then the internal state is used.
 * @param setCurrent -
 *        The mutator method to set the current value.  This can
 *        be undefined, but if it is set, both the internal value and
 *        the prop value are set.
 * @param initial -
 *        The initial value to set if current is undefined.
 *
 * @returns
 *        A tuple where the first item is the current state and the 2nd item is a mutator
 *        method to modify the state.
 */
export function useAmbassadorState<T>(
  current: T | undefined,
  setCurrent: SetCurrent<T>,
  initial: T
): [T, (val: T) => void];

/**
 * A type of safe state where the value is used from the props in the case of them being set.
 *
 * Otherwise, an internal set of properties are used.  This is useful in the case that you
 * want to allow properties to control the state of the component, but this functionality is
 * to be optional.
 *
 * @param current -
 *        The current value from the props.  If this is
 *        undefined, then the internal state is used.
 * @param setCurrent -
 *        The mutator method to set the current value.  This can
 *        be undefined, but if it is set, both the internal value and
 *        the prop value are set.
 * @param initial -
 *        The initial value to set if current is undefined.
 *
 * @returns
 *        A tuple where the first item is the current state and the 2nd item is a mutator
 *        method to modify the state.
 */
export function useAmbassadorState<T>(
  current: T | undefined,
  setCurrent: SetCurrent<T>,
  initial?: T
): [T | undefined, (val: T) => void] {
  const [localCurrent, setLocalCurrent] = useState<T | undefined>(current || initial);

  const _current = current === undefined ? localCurrent : current;

  const _setCurrent = (val: T) => {
    setLocalCurrent(val);

    if (setCurrent) {
      setCurrent(val);
    }
  };

  return [_current, _setCurrent];
}

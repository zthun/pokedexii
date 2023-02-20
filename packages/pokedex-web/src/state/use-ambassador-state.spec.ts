/* eslint-disable require-jsdoc */
import { IZCircusReactHook, ZCircusSetupHook } from '@zthun/cirque-du-react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAmbassadorState } from './use-ambassador-state';

describe('useAmbassadorState', () => {
  let current: string | undefined;
  let initial: string | undefined;
  let setCurrent: ((val: string) => void) | undefined;

  function createTestTarget() {
    return new ZCircusSetupHook(() => useAmbassadorState(current, setCurrent, initial)).setup();
  }

  beforeEach(() => {
    current = undefined;
    initial = undefined;
    setCurrent = undefined;
  });

  async function setValueAndRerender(
    expected: string,
    target: IZCircusReactHook<[string | undefined, (val: string) => void], any>
  ) {
    const [, setVal] = await target.current();
    setVal(expected);
    return target.rerender();
  }

  describe('Props', () => {
    beforeEach(() => {
      current = 'by-props';
      setCurrent = _setCurrent;
    });

    function _setCurrent(val: string) {
      current = val;
    }

    it('should return the prop value.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const [val] = await target.current();
      // Assert
      expect(val).toEqual(current);
    });

    it('should set the prop value.', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = 'value-to-set';
      // Act.
      await setValueAndRerender(expected, target);
      // Assert.
      expect(current).toEqual(expected);
    });
  });

  describe('State', () => {
    it('should set an initial value.', async () => {
      // Arrange
      initial = 'initial';
      const target = await createTestTarget();
      // Act
      const [actual] = await target.current();
      // Assert
      expect(actual).toEqual(initial);
    });

    it('should set the internal state if the props are undefined.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = 'updated-value';
      // Act
      const [actual] = await setValueAndRerender(expected, target);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});

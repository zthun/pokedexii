/* eslint-disable require-jsdoc */
import { ZCircusSetupHook } from '@zthun/cirque-du-react';
import { noop } from 'lodash';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import {
  asStateData,
  asStateError,
  isStateErrored,
  isStateLoaded,
  isStateLoading,
  useAsyncState,
  ZAsyncLoading
} from './use-async-state';

describe('useAsyncState', () => {
  let load: Mock;

  async function createTestTarget() {
    const target = await new ZCircusSetupHook(() => useAsyncState<string>(load)).setup();
    await new Promise((resolve) => setTimeout(resolve, 5));
    return target;
  }

  function mockLoadedData(data: string) {
    load.mockResolvedValue(data);
  }

  function mockErrorData(message: string) {
    load.mockRejectedValue(new Error(message));
  }

  function mockLoadingData() {
    load.mockReturnValue(new Promise(noop));
  }

  beforeEach(() => {
    load = vi.fn();
  });

  describe('Success', () => {
    it('should return the data.', async () => {
      // Arrange.
      const expected = 'OK';
      mockLoadedData(expected);
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoaded(actual)).toBeTruthy();
      expect(asStateData(actual)).toEqual(expected);
    });

    it('should not return data that has failed to load.', async () => {
      // Arrange.
      mockErrorData('Something went wrong');
      const target = await createTestTarget();
      // Acct.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoaded(actual)).toBeFalsy();
      expect(asStateData(actual)).toBeUndefined();
    });

    it('should not return data that is loading.', async () => {
      // Arrange.
      mockLoadingData();
      const target = await createTestTarget();
      // Acct.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoaded(actual)).toBeFalsy();
      expect(asStateData(actual)).toBeUndefined();
    });
  });

  describe('Error', () => {
    it('should return an error object.', async () => {
      // Arrange.
      const expected = 'Something went wrong';
      mockErrorData(expected);
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert
      expect(isStateErrored(actual)).toBeTruthy();
      expect(asStateError(actual)?.message).toContain(expected);
    });

    it('should not return errors on loaded data.', async () => {
      // Arrange.
      mockLoadedData('OK');
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateErrored(actual)).toBeFalsy();
      expect(asStateError(actual)).toBeUndefined();
    });

    it('should not return errors on loading data.', async () => {
      // Arrange.
      mockLoadingData();
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateErrored(actual)).toBeFalsy();
      expect(asStateError(actual)).toBeUndefined();
    });
  });

  describe('Loading', () => {
    it('should return the loading symbol', async () => {
      // Arrange.
      mockLoadingData();
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoading(actual)).toBeTruthy();
      expect(actual).toEqual(ZAsyncLoading);
    });

    it('should not return the loading symbol on loaded data.', async () => {
      // Arrange.
      mockLoadedData('OK');
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoading(actual)).toBeFalsy();
      expect(actual).not.toEqual(ZAsyncLoading);
    });

    it('should not return the loading symbol on errored data.', async () => {
      // Arrange.
      mockErrorData('Some error happened');
      const target = await createTestTarget();
      // Act.
      const [actual] = await target.rerender();
      // Assert.
      expect(isStateLoading(actual)).toBeFalsy();
      expect(actual).not.toEqual(ZAsyncLoading);
    });
  });

  describe('Update', () => {
    it('should reload the data when the setter is invoked with undefined', async () => {
      // Arrange
      const target = await createTestTarget();
      const [, refresh] = await target.current();
      // Act.
      load.mockClear();
      await refresh();
      await target.rerender();
      // Assert.
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('should not reload data if the setter is invoked with a non undefined value', async () => {
      // Arrange
      const target = await createTestTarget();
      const [, setData] = await target.current();
      const expected = 'This should be set right away';
      // Act.
      load.mockClear();
      await setData(expected);
      const [actual] = await target.rerender();
      // Assert.
      expect(load).not.toHaveBeenCalled();
      expect(actual).toEqual(expected);
    });
  });
});

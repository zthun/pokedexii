import { range } from 'lodash';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZDataRequestBuilder } from './data-request';
import { ZDataSourceAsync } from './data-source-async';

describe('ZDataSourceAsync', () => {
  let data: Promise<number[]>;

  function createTestTarget() {
    return new ZDataSourceAsync(data);
  }

  beforeEach(() => {
    data = Promise.resolve(range(1, 1101));
  });

  describe('Count', () => {
    it('should return the total count of the data', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = (await data).length;
      const request = new ZDataRequestBuilder().build();
      // Act
      const result = await target.count(request);
      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('Retrieve', () => {
    it('should return the requested page', async () => {
      // Arrange
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().size(100).build();
      const expected = range(1, 101);
      // Act.
      const result = await target.retrieve(request);
      // Assert.
      expect(result).toEqual(expected);
    });
  });
});

import { range } from 'lodash';
import { beforeEach, describe, expect, it } from 'vitest';
import { IZDataRequest, ZDataRequestBuilder } from './data-request';
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
    it('should return the total count of the data unpaginated', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = (await data).length;
      // Act
      const result = await target.count();
      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('Retrieve', () => {
    async function shouldResultInPage(expected: number[], request: IZDataRequest) {
      const target = createTestTarget();
      // Act.
      const result = await target.retrieve(request);
      // Assert.
      expect(result).toEqual(expected);
    }

    it('should return an empty page if the page size goes beyond the final page', async () => {
      const request = new ZDataRequestBuilder().page(1000).size(1000).build();
      await shouldResultInPage([], request);
    });

    it('should return the entire data set if the size is infinite and the page is equal to 1', async () => {
      const request = new ZDataRequestBuilder().build();
      await shouldResultInPage(await data, request);
    });

    it('should return an empty page if size is infinite, but page is greater than 1', async () => {
      const request = new ZDataRequestBuilder().page(2).build();
      await shouldResultInPage([], request);
    });

    it('should return the requested page', async () => {
      const request = new ZDataRequestBuilder().page(2).size(100).build();
      await shouldResultInPage(range(101, 201), request);
    });

    it('should return the last page remaining data', async () => {
      const request = new ZDataRequestBuilder().page(11).size(100).build();
      await shouldResultInPage(range(1001, 1101), request);
    });
  });
});

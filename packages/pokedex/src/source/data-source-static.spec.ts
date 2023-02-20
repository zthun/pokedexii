import { range } from 'lodash';
import { beforeEach, describe, expect, it } from 'vitest';
import { IZDataMatch } from './data-match';
import { IZDataRequest, ZDataRequestBuilder } from './data-request';
import { ZDataSearchFields } from './data-search-fields';
import { ZDataSearchText } from './data-search-text';
import { ZDataSourceStatic } from './data-source-static';

describe('ZDataSourceStatic', () => {
  let data: any[];
  let search: IZDataMatch<any, string> | undefined;

  function createTestTarget() {
    return new ZDataSourceStatic(data, search);
  }

  beforeEach(() => {
    search = undefined;
    data = range(1, 1101);
  });

  describe('Count', () => {
    it('should return the total count of the data unpaginated', async () => {
      // Arrange
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(5).build();
      // Act
      const result = await target.count(request);
      // Assert
      expect(result).toEqual(data.length);
    });

    it('should return the total count of the data after a search', async () => {
      // Arrange
      search = new ZDataSearchText();
      data = ['Batman', 'Superman', 'Flash', 'Wonder Woman', 'Green Lantern', 'John Constantine'];
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().search('man').build();
      // Act
      const result = await target.count(request);
      // Assert.
      expect(result).toEqual(3);
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
      await shouldResultInPage(data, request);
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

    it('should only return the data that matches a search', async () => {
      // Arrange
      search = new ZDataSearchText();
      data = ['Batman', 'Superman', 'Flash', 'Wonder Woman', 'Green Lantern', 'John Constantine'];
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().search('man').page(2).size(2).build();
      const expected = ['Wonder Woman'];
      // Act
      const result = await target.retrieve(request);
      // Assert.
      expect(result).toEqual(expected);
    });
  });

  describe('Object Search', () => {
    interface IZHero {
      id: string;
      name: string;
      alias: string;
    }

    let batman: IZHero;
    let superman: IZHero;
    let wonderWoman: IZHero;
    let johnConstantine: IZHero;
    let greenLantern: IZHero;

    beforeEach(() => {
      batman = { id: 'batman', name: 'Bruce Wayne', alias: 'Batman' };
      superman = { id: 'superman', name: 'Clark Kent', alias: 'Superman' };
      wonderWoman = { id: 'wonder-woman', name: 'Diana Prince', alias: 'Wonder Woman' };
      johnConstantine = { id: 'constantine', name: 'John Constantine', alias: 'John Constantine' };
      greenLantern = { id: 'green-lantern', name: 'Hal Jordan', alias: 'Green Lantern' };

      search = new ZDataSearchFields();
      data = [batman, superman, wonderWoman, johnConstantine, greenLantern];
    });

    it('should only find the objects which match any property', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().search('man').build();
      const expected = [batman, superman, wonderWoman];
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should only find the objects which match just the specified fields', async () => {
      // Arrange.
      search = new ZDataSearchFields(['name', 'noise']);
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().search('An').build();
      const expected = [wonderWoman, johnConstantine, greenLantern];
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should not match fields that are not in the field list', async () => {
      // Arrange.
      search = new ZDataSearchFields(['id']);
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().search('john').build();
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual([]);
    });
  });
});

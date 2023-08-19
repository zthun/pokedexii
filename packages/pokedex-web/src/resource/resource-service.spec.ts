import { ZDataRequestBuilder, ZPageBuilder } from '@zthun/helpful-query';
import { IZType, ZTypeBuilder } from '@zthun/pokedex';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/webigail-http';
import { beforeEach, describe, expect, it } from 'vitest';
import { ZResourceService } from './resource-service';

describe('ZResourceService', () => {
  let http: ZHttpServiceMock;
  let fire: IZType;
  let water: IZType;
  let electric: IZType;
  let types: IZType[];

  const createTestTarget = () => new ZResourceService(http, 'types');

  beforeEach(() => {
    http = new ZHttpServiceMock();

    fire = new ZTypeBuilder().fire().build();
    water = new ZTypeBuilder().water().build();
    electric = new ZTypeBuilder().electric().build();

    types = [fire, water, electric];
  });

  describe('Retrieve', () => {
    it('should return the items from the http service', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(1).size(20).search('ele').build();
      const expected = new ZPageBuilder().singleton(electric).build();
      http.set(
        target.api().page(request.page).size(request.size).search(request.search).build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(expected).build()
      );
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual([electric]);
    });
  });

  describe('Count', () => {
    it('should return the total number of items across all pages', async () => {
      // Arrange.
      const target = createTestTarget();
      const expected = new ZPageBuilder<IZType>().data([fire]).count(types.length).build();
      http.set(target.api().page(1).size(1).build(), ZHttpMethod.Get, new ZHttpResultBuilder(expected).build());
      // Act.
      const actual = await target.count();
      // Assert.
      expect(actual).toEqual(expected.count);
    });
  });

  describe('Get', () => {
    it('should retrieve a specific resource', async () => {
      // Arrange.
      const target = createTestTarget();
      http.set(
        target.api().append(String(electric.id)).build(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(electric).build()
      );
      // Act.
      const actual = await target.get(electric.id);
      // Assert.
      expect(actual).toEqual(electric);
    });
  });
});

import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { findIndex } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { createApiPage } from '../poke-api/poke-api-page';
import { IPokeApiNamedResource, createResource, findId } from '../poke-api/poke-api-resource';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IZResource } from './resource';
import { ZResourceService } from './resource-service';

describe('ZResourceService', () => {
  let retriever: Mocked<IPokeApiRetrieval<IPokeApiNamedResource>>;
  let converter: Mocked<IPokeApiConverter<IPokeApiNamedResource, IZResource>>;
  let resourceA: IZResource;
  let resourceB: IZResource;
  let resourceC: IZResource;
  let resourceD: IZResource;
  let resources: IZResource[];

  const createTestTarget = () => new ZResourceService(retriever, converter);

  const getResourceByName = (name: string): Promise<IPokeApiNamedResource> => {
    const index = findIndex(resources, (r) => r.name === name);

    if (index < 0) {
      return Promise.reject('Resource not found');
    }

    const target = resources[index];
    return Promise.resolve(createResource('resource', target.id, target.name));
  };

  beforeEach(() => {
    resourceA = { id: 1, name: 'resource-a' };
    resourceB = { id: 2, name: 'resource-b' };
    resourceC = { id: 3, name: 'resource-c' };
    resourceD = { id: 4, name: 'resource-d' };
    resources = [resourceA, resourceB, resourceC, resourceD];

    converter = mock<IPokeApiConverter<IPokeApiNamedResource, IZResource>>();
    converter.convert.mockImplementation((r) => Promise.resolve({ name: r.name, id: findId(r) }));

    retriever = mock<IPokeApiRetrieval<IPokeApiNamedResource>>();
    retriever.list.mockResolvedValue(createApiPage('resource', resources));
    retriever.get.mockImplementation(getResourceByName);
  });

  describe('Count', () => {
    it('should retrieve the correct value', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      // Act.
      const actual = await target.count(request);
      // Assert.
      expect(actual).toEqual(resources.length);
    });
  });

  describe('List', () => {
    it('should retrieve the correct page of pokemon', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      const expected = [resourceC, resourceD];
      // Act.
      const actual = await target.retrieve(request);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should prefetch only once', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      // Act.
      await target.retrieve(request);
      await target.retrieve(request);
      // Assert.
      expect(retriever.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get', () => {
    it('should retrieve the converted value', async () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = await target.get(resourceB.name);
      // Assert.
      expect(actual).toEqual(resourceB);
    });
  });
});

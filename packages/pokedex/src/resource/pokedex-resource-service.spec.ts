import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { findIndex } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApiConverter } from '../poke-api/poke-api-converter';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiNamedResource } from '../poke-api/poke-api-resource';
import { IPokeApiRetrieval } from '../poke-api/poke-api-retrieval';
import { IZPokedexNamedResource } from './pokedex-named-resource';
import { ZPokedexResourceService } from './pokedex-resource-service';

describe('ZPokemonResourceService', () => {
  let retriever: Mocked<IPokeApiRetrieval<IPokeApiNamedResource>>;
  let converter: Mocked<IPokeApiConverter<IPokeApiNamedResource, IZPokedexNamedResource>>;
  let resourceA: IZPokedexNamedResource;
  let resourceB: IZPokedexNamedResource;
  let resourceC: IZPokedexNamedResource;
  let resourceD: IZPokedexNamedResource;
  let resources: IZPokedexNamedResource[];

  const createPage = (resources: IZPokedexNamedResource[]): IPokeApiPage => ({
    count: resources.length,
    next: null,
    previous: null,
    results: resources.map((r) => ({ name: r.name, url: '' }))
  });

  const createTestTarget = () => new ZPokedexResourceService(retriever, converter);

  const getResourceByName = (name: string): Promise<IPokeApiNamedResource> => {
    const index = findIndex(resources, (r) => r.name === name);

    if (index < 0) {
      return Promise.reject('Resource not found');
    }

    const target = resources[index];
    return Promise.resolve({ name: target.name, url: '' });
  };

  beforeEach(() => {
    resourceA = { name: 'resource-a' };
    resourceB = { name: 'resource-b' };
    resourceC = { name: 'resource-c' };
    resourceD = { name: 'resource-d' };
    resources = [resourceA, resourceB, resourceC, resourceD];

    converter = mock<IPokeApiConverter<IPokeApiNamedResource, IZPokedexNamedResource>>();
    converter.convert.mockImplementation((r) => Promise.resolve({ name: r.name }));

    retriever = mock<IPokeApiRetrieval<IPokeApiNamedResource>>();
    retriever.list.mockResolvedValue(createPage(resources));
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

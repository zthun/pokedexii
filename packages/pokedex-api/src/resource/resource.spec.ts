import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { ZSpeciesBuilder } from '@zthun/pokedex';
import { ZHttpCodeServer, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/webigail-http';
import { ZHttpServiceToken } from '@zthun/webigail-nest';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiSpecies, ZPokeApiSpeciesHelper } from '../species/species';
import { ZPokeApiResourceHelper } from './resource';
import { ZPokedexResourceModule } from './resource-module';
import { ZPokedexResourceService } from './resource-service';

describe('ZResourceSeeder', () => {
  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let http: ZHttpServiceMock;

  const createTestTarget = async () => {
    const target = await Test.createTestingModule({ imports: [ZPokedexResourceModule] })
      .overrideProvider(ZHttpServiceToken)
      .useValue(http)
      .overrideProvider(ZPokedexDatabaseToken)
      .useValue(dal)
      .compile();

    return target.resolve(ZPokedexResourceService);
  };

  beforeAll(async () => {
    const options = new ZDatabaseOptionsBuilder().database('resource-test-database').timeout(10000).build();
    server = new ZDatabaseServerDocument();
    dal = await server.start(options);
  });

  beforeEach(() => {
    http = new ZHttpServiceMock();

    const helper = new ZPokeApiResourceHelper();
    const collections = Object.values(ZPokedexCollection);

    collections.forEach(async (c) => {
      http.set(
        ZPokedexResourceService.pageEndpoint(c),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(helper.toPage([])).build()
      );

      await dal.delete(c);
    });
  });

  describe('Seed', () => {
    it('should populate all data from the poke api', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = Object.values(ZPokedexCollection);
      vi.spyOn(dal, 'create');
      // Act.
      await target.seed();
      // Assert.
      expect(dal.create).toHaveBeenCalledTimes(expected.length);
      expected.forEach((c) => expect(dal.create).toHaveBeenCalledWith(c, expect.anything()));
    });

    it('should populate as many collections as possible', async () => {
      // Arrange.
      http.set(
        ZPokedexResourceService.pageEndpoint(ZPokedexCollection.BerryFlavor),
        ZHttpMethod.Get,
        new ZHttpResultBuilder('An error occurred').status(ZHttpCodeServer.ServiceUnavailable).build()
      );
      const target = await createTestTarget();
      vi.spyOn(dal, 'create');
      // Act.
      await target.seed();
      // Assert.
      expect(dal.create).toHaveBeenCalledTimes(Object.values(ZPokedexCollection).length - 1);
      expect(dal.create).not.toHaveBeenCalledWith(ZPokedexCollection.BerryFlavor, expect.anything());
    });
  });

  describe('Populate', () => {
    let squirtle: IPokeApiSpecies;
    let charmander: IPokeApiSpecies;
    let charizard: IPokeApiSpecies;
    let bulbasaur: IPokeApiSpecies;
    let pikachu: IPokeApiSpecies;
    let species: IPokeApiSpecies[];

    beforeEach(() => {
      const resourceHelper = new ZPokeApiResourceHelper();
      const speciesHelper = new ZPokeApiSpeciesHelper();

      squirtle = speciesHelper.from(new ZSpeciesBuilder().squirtle().build());
      charmander = speciesHelper.from(new ZSpeciesBuilder().charmander().build());
      charizard = speciesHelper.from(new ZSpeciesBuilder().charizard().build());
      bulbasaur = speciesHelper.from(new ZSpeciesBuilder().bulbasaur().build());
      pikachu = speciesHelper.from(new ZSpeciesBuilder().pikachu().build());

      species = [squirtle, charmander, charizard, bulbasaur, pikachu];

      const resources = species.map((s) => resourceHelper.toResource(ZPokedexCollection.PokemonSpecies, s.id, s.name));

      http.set(
        ZPokedexResourceService.pageEndpoint(ZPokedexCollection.PokemonSpecies),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(resourceHelper.toPage(resources)).build()
      );

      resources.map((r, i) => {
        http.set(r.url, ZHttpMethod.Get, new ZHttpResultBuilder(species[i]).build());
      });
    });

    it('should populate the equivalent collection database with the list returned from the pokeapi', async () => {
      // Arrange.
      const helper = new ZPokeApiSpeciesHelper();
      const target = await createTestTarget();
      const expected = species.map((s) => helper.to(s));
      // Act.
      await target.populate(ZPokedexCollection.PokemonSpecies, 2, 0);
      const _species = await dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies);
      const actual = _species.map((s) => helper.to(s));
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should retry a set number of times to retrieve the page', async () => {
      // Arrange.
      const target = await createTestTarget();
      let actual = 0;
      const expected = 3;
      http.set(ZPokedexResourceService.pageEndpoint(ZPokedexCollection.PokemonSpecies), ZHttpMethod.Get, () => {
        ++actual;
        return new ZHttpResultBuilder('An error occurred').status(ZHttpCodeServer.ServiceUnavailable).build();
      });
      // Act.
      await target.populate(ZPokedexCollection.PokemonSpecies, 1, 0, expected);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should retry each failed resource', async () => {
      // Arrange.
      const helper = new ZPokeApiResourceHelper();
      const { url } = helper.toResource(ZPokedexCollection.PokemonSpecies, squirtle.id, squirtle.name);
      const target = await createTestTarget();
      let actual = 0;
      const expected = 3;
      http.set(url, ZHttpMethod.Get, () => {
        ++actual;
        return new ZHttpResultBuilder('An error occurred').status(ZHttpCodeServer.ServiceUnavailable).build();
      });
      // Act.
      await target.populate(ZPokedexCollection.PokemonSpecies, 1, 0, expected);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should not populate a collection if it is already populated', async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.populate(ZPokedexCollection.PokemonSpecies);
      const expected = await dal.count(ZPokedexCollection.PokemonSpecies);
      // Act.
      await target.populate(ZPokedexCollection.PokemonSpecies);
      const actual = await dal.count(ZPokedexCollection.PokemonSpecies);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });
});

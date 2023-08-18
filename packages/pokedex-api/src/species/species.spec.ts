import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { IZSpecies, ZPokemonBuilder, ZSpeciesBuilder } from '@zthun/pokedex';
import { ZHttpCodeClient, ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { ZPokeApiPokemonBuilder } from '../pokemon/pokemon';
import { ZPokeApiSpeciesBuilder } from './species';
import { ZSpeciesModule } from './species-module';

describe('ZSpeciesApi', () => {
  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let $squirtle: IZSpecies;
  let $charmander: IZSpecies;
  let $bulbasaur: IZSpecies;
  let species: IZSpecies[];
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZSpeciesModule] })
      .overrideProvider(ZDatabaseToken)
      .useValue(dal)
      .compile();

    _target = module.createNestApplication();
    await _target.init();
    return _target;
  };

  beforeAll(async () => {
    const options = new ZDatabaseOptionsBuilder().database('pokemon-species-test-database').timeout(30000).build();
    server = new ZDatabaseServerDocument();
    dal = await server.start(options);
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    $squirtle = new ZSpeciesBuilder().squirtle().build();
    $charmander = new ZSpeciesBuilder().charmander().build();
    $bulbasaur = new ZSpeciesBuilder().bulbasaur().build();
    species = [$squirtle, $charmander, $bulbasaur];

    await dal.delete(ZPokedexCollection.PokemonSpecies);
    await dal.delete(ZPokedexCollection.Pokemon);
    await dal.create(
      ZPokedexCollection.PokemonSpecies,
      species.map((s) => new ZPokeApiSpeciesBuilder().from(s).build())
    );
    await dal.create(ZPokedexCollection.Pokemon, [
      new ZPokeApiPokemonBuilder().from(new ZPokemonBuilder().squirtle().build()).build(),
      new ZPokeApiPokemonBuilder().from(new ZPokemonBuilder().charmander().build()).build(),
      new ZPokeApiPokemonBuilder().from(new ZPokemonBuilder().bulbasaur().build()).build()
    ]);
  });

  afterEach(async () => {
    _target?.close();
  });

  describe('List', () => {
    it('should list all species', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get('/species');
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(species);
    });

    it('should return the specific count', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get('/species?size=1');
      // Assert
      expect(actual.body.count).toEqual(species.length);
    });

    it('should return the specific page size', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get('/species?size=2');
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(species.slice(0, 2));
    });

    it('should return the correct page number', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get('/species?page=2&size=2');
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(species.slice(2));
    });

    it('should return species that match the id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species?search=${$charmander.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([$charmander]);
    });

    it('should return species that match the name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get('/species?search=cHar');
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([$charmander]);
    });
  });

  describe('Get', () => {
    it('should retrieve the specific species by name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species/${$bulbasaur.name}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual($bulbasaur);
    });

    it('should retrieve the specific species by id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species/${$bulbasaur.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual($bulbasaur);
    });

    it('should return a not found if the species does not exist', async () => {
      // Arrange.
      const target = await createTestTarget();
      const { id } = new ZSpeciesBuilder().pikachu().build();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species/${id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
      expect(actual.body.message).toBeTruthy();
    });
  });
});

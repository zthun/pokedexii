import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { IZSpecies, ZSpeciesBuilder } from '@zthun/pokedex';
import { ZHttpCodeClient, ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { ZPokeApiSpeciesHelper } from './species';
import { ZPokedexSpeciesModule } from './species-module';

describe('ZSpeciesApi', () => {
  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let squirtle: IZSpecies;
  let charmander: IZSpecies;
  let bulbasaur: IZSpecies;
  let species: IZSpecies[];
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZPokedexSpeciesModule] })
      .overrideProvider(ZPokedexDatabaseToken)
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
    squirtle = new ZSpeciesBuilder().squirtle().build();
    charmander = new ZSpeciesBuilder().charmander().build();
    bulbasaur = new ZSpeciesBuilder().bulbasaur().build();
    species = [squirtle, charmander, bulbasaur];

    const converter = new ZPokeApiSpeciesHelper();

    await dal.delete(ZPokedexCollection.PokemonSpecies);
    await dal.create(ZPokedexCollection.PokemonSpecies, species.map(converter.from.bind(converter)));
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
      expect(actual.body).toEqual(species);
    });
  });

  describe('Get', () => {
    it('should retrieve the specific species by name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species/${bulbasaur.name}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(bulbasaur);
    });

    it('should retrieve the specific species by id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/species/${bulbasaur.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(bulbasaur);
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

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { IZEvolution, ZEvolutionBuilder } from '@zthun/pokedex';
import { ZHttpCodeClient, ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { ZEvolutionsModule } from './evolutions-module';
import { ZPokeApiEvolutionChainBuilder } from './poke-api-evolution-chain';

describe('ZEvolutionsApi', () => {
  const endpoint = 'pokemon';

  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let ralts: IZEvolution;
  let evolutions: IZEvolution[];
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZEvolutionsModule] })
      .overrideProvider(ZDatabaseToken)
      .useValue(dal)
      .compile();

    _target = module.createNestApplication();
    await _target.init();
    return _target;
  };

  beforeAll(async () => {
    const options = new ZDatabaseOptionsBuilder().database('evolutions-test-database').timeout(30000).build();
    server = new ZDatabaseServerDocument();
    dal = await server.start(options);
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    ralts = new ZEvolutionBuilder().ralts().build();

    evolutions = [ralts];

    const _evolutions = evolutions.map((p) => new ZPokeApiEvolutionChainBuilder().from(p).build());

    await dal.delete(ZPokedexCollection.EvolutionChain);
    await dal.create(ZPokedexCollection.EvolutionChain, _evolutions);
  });

  afterEach(async () => {
    await _target?.close();
  });

  describe('List', () => {
    it('should list all evolutions', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(evolutions);
    });

    it('should return the specific count', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=1`);
      // Assert
      expect(actual.body.count).toEqual(evolutions.length);
    });

    it('should return the specific page size', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(evolutions.slice(0, 2));
    });

    it('should return the correct page number', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?page=2&size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(evolutions.slice(2, 4));
    });

    it('should return evolutions that match the id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?search=${ralts.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([ralts]);
    });
  });

  describe('Get', () => {
    it('should retrieve the specific evolution by id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${ralts.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(ralts);
    });

    it('should return a not found if the evolution does not exist', async () => {
      // Arrange.
      const target = await createTestTarget();
      const id = 'next-generation-evolution';
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
      expect(actual.body.message).toBeTruthy();
    });
  });
});

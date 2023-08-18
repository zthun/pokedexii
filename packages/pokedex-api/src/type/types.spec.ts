import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { IZType, ZTypeBuilder } from '@zthun/pokedex';
import { ZHttpCodeClient, ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { ZPokeApiTypeBuilder } from './type';
import { ZTypesModule } from './types-module';

describe('ZTypeApi', () => {
  const endpoint = 'types';

  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let fire: IZType;
  let water: IZType;
  let electric: IZType;
  let ground: IZType;
  let rock: IZType;
  let types: IZType[];
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZTypesModule] })
      .overrideProvider(ZDatabaseToken)
      .useValue(dal)
      .compile();

    _target = module.createNestApplication();
    await _target.init();
    return _target;
  };

  beforeAll(async () => {
    const options = new ZDatabaseOptionsBuilder().database('types-test-database').timeout(30000).build();
    server = new ZDatabaseServerDocument();
    dal = await server.start(options);
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    fire = new ZTypeBuilder().fire().build();
    water = new ZTypeBuilder().water().build();
    electric = new ZTypeBuilder().electric().build();
    ground = new ZTypeBuilder().ground().build();
    rock = new ZTypeBuilder().rock().build();
    types = [fire, water, electric, ground, rock];

    const _types = types.map((s) => new ZPokeApiTypeBuilder().from(s).build());

    await dal.delete(ZPokedexCollection.Type);
    await dal.create(ZPokedexCollection.Type, _types);
  });

  afterEach(async () => {
    await _target?.close();
  });

  describe('List', () => {
    it('should list all types', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(types);
    });

    it('should return the specific count', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=1`);
      // Assert
      expect(actual.body.count).toEqual(types.length);
    });

    it('should return the specific page size', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(types.slice(0, 2));
    });

    it('should return the correct page number', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?page=2&size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(types.slice(2, 4));
    });

    it('should return species that match the id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?search=${water.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([water]);
    });

    it('should return species that match the name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?search=waT`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([water]);
    });
  });

  describe('Get', () => {
    it('should retrieve the specific species by name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${water.name}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(water);
    });

    it('should retrieve the specific species by id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${fire.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(fire);
    });

    it('should return a not found if the species does not exist', async () => {
      // Arrange.
      const target = await createTestTarget();
      const id = 'next-gen-type';
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
      expect(actual.body.message).toBeTruthy();
    });
  });
});

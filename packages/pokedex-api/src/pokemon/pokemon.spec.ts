import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IZDatabaseDocument, ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { IZDatabaseServer, ZDatabaseServerDocument } from '@zthun/dalmart-memory';
import { IZPokemon, ZPokemonBuilder, ZTypeBuilder } from '@zthun/pokedex';
import { ZHttpCodeClient, ZHttpCodeSuccess } from '@zthun/webigail-http';
import request from 'supertest';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { ZPokeApiTypeBuilder } from '../type/type';
import { ZPokeApiPokemonBuilder } from './pokemon';
import { ZPokedexPokemonModule } from './pokemon-module';

describe('ZPokemonApi', () => {
  const endpoint = 'pokemon';
  let server: IZDatabaseServer<IZDatabaseDocument>;
  let dal: IZDatabaseDocument;
  let charizard: IZPokemon;
  let _target: INestApplication<any>;

  const createTestTarget = async () => {
    const module = await Test.createTestingModule({ imports: [ZPokedexPokemonModule] })
      .overrideProvider(ZDatabaseToken)
      .useValue(dal)
      .compile();

    _target = module.createNestApplication();
    await _target.init();
    return _target;
  };

  beforeAll(async () => {
    const options = new ZDatabaseOptionsBuilder().database('pokemon-test-database').timeout(30000).build();
    server = new ZDatabaseServerDocument();
    dal = await server.start(options);
  });

  afterAll(async () => {
    await server.stop();
  });

  beforeEach(async () => {
    charizard = new ZPokemonBuilder().charizard().build();

    await dal.delete(ZPokedexCollection.Pokemon);
    await dal.delete(ZPokedexCollection.Type);
    await dal.create(ZPokedexCollection.Pokemon, [new ZPokeApiPokemonBuilder().from(charizard).build()]);
    await dal.create(ZPokedexCollection.Type, [
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().electric().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().fire().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().flying().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().rock().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().water().build()).build()
    ]);
  });

  afterEach(async () => {
    await _target?.close();
  });

  describe('Get', () => {
    it('should retrieve the specific pokemon by name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${charizard.name}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(charizard);
    });

    it('should retrieve the specific pokemon by id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${charizard.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body).toEqual(charizard);
    });

    it('should return a not found if the pokemon does not exist', async () => {
      // Arrange.
      const target = await createTestTarget();
      const { id } = new ZPokemonBuilder().pikachu().build();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}/${id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
      expect(actual.body.message).toBeTruthy();
    });
  });
});

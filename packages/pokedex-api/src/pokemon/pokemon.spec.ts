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
  let charmander: IZPokemon;
  let squirtle: IZPokemon;
  let charizard: IZPokemon;
  let pokemon: IZPokemon[];
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
    squirtle = new ZPokemonBuilder().squirtle().build();
    charmander = new ZPokemonBuilder().charmander().build();
    charizard = new ZPokemonBuilder().charizard().build();

    pokemon = [squirtle, charmander, charizard];

    const _pokemon = pokemon.map((p) => new ZPokeApiPokemonBuilder().from(p).build());
    const _types = [
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().electric().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().fire().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().flying().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().rock().build()).build(),
      new ZPokeApiTypeBuilder().from(new ZTypeBuilder().water().build()).build()
    ];

    await dal.delete(ZPokedexCollection.Pokemon);
    await dal.delete(ZPokedexCollection.Type);
    await dal.create(ZPokedexCollection.Pokemon, _pokemon);
    await dal.create(ZPokedexCollection.Type, _types);
  });

  afterEach(async () => {
    await _target?.close();
  });

  describe('List', () => {
    it('should list all pokemon', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(pokemon);
    });

    it('should return the specific count', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=1`);
      // Assert
      expect(actual.body.count).toEqual(pokemon.length);
    });

    it('should return the specific page size', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(pokemon.slice(0, 2));
    });

    it('should return the correct page number', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?page=2&size=2`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual(pokemon.slice(2, 4));
    });

    it('should return species that match the id', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?search=${squirtle.id}`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([squirtle]);
    });

    it('should return species that match the name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await request(target.getHttpServer()).get(`/${endpoint}?search=cHar`);
      // Assert.
      expect(actual.status).toEqual(ZHttpCodeSuccess.OK);
      expect(actual.body.data).toEqual([charmander, charizard]);
    });
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

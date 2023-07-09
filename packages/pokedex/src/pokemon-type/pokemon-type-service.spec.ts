import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { keyBy } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiType } from '../poke-api/poke-api-type';
import { IZPokemonType, ZPokemonTypeBuilder } from './pokemon-type';
import { ZPokemonTypeServiceApi } from './pokemon-type-service';

describe('ZPokemonService', () => {
  let api: Mocked<IPokeApi>;
  let ground: IZPokemonType;
  let electric: IZPokemonType;
  let types: IZPokemonType[];

  function createTestTarget() {
    return new ZPokemonTypeServiceApi(api);
  }

  beforeEach(() => {
    ground = new ZPokemonTypeBuilder().ground().build();
    electric = new ZPokemonTypeBuilder().electric().build();

    types = [ground, electric];

    const _pokeMap = keyBy<IPokeApiType>(
      types.map((p) => ({
        damage_relations: {
          double_damage_from: p.doubleDamageFrom.map((d) => ({ name: d, url: '' })),
          double_damage_to: p.doubleDamageTo.map((d) => ({ name: d, url: '' })),
          half_damage_from: p.halfDamageFrom.map((d) => ({ name: d, url: '' })),
          half_damage_to: p.halfDamageTo.map((d) => ({ name: d, url: '' })),
          no_damage_from: p.noDamageFrom.map((d) => ({ name: d, url: '' })),
          no_damage_to: p.noDamageTo.map((d) => ({ name: d, url: '' }))
        },
        game_indices: [],
        generation: { name: '', url: '' },
        id: 0,
        move_damage_class: { name: '', url: '' },
        moves: [],
        name: p.name,
        names: [],
        past_damage_relations: [],
        pokemon: []
      })),
      (p) => p.name
    );

    const _pokePage: IPokeApiPage = {
      count: types.length,
      next: null,
      previous: null,
      results: types.map((p) => ({
        name: p.name,
        url: ''
      }))
    };

    api = mock<IPokeApi>();

    api.types.mockResolvedValue(_pokePage);
    api.type.mockImplementation((name) =>
      _pokeMap[name] ? Promise.resolve(_pokeMap[name]) : Promise.reject('Type not found')
    );
  });

  describe('List', () => {
    it('should retrieve the correct count', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      // Act.
      const actual = await target.count(request);
      // Assert.
      expect(actual).toEqual(types.length);
    });

    it('should retrieve the correct page', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(1).build();
      const expected = [electric];
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
      expect(api.types).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get', () => {
    const shouldSetProperty = async <T>(expected: T, name: string, propertyFn: (p: IZPokemonType) => T) => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const pkm = await target.get(name);
      const actual = propertyFn(pkm);
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the name', async () => {
      await shouldSetProperty(ground.name, ground.name, (p) => p.name);
    });

    it('should set the double damage from', async () => {
      await shouldSetProperty(ground.doubleDamageFrom, ground.name, (p) => p.doubleDamageFrom);
    });

    it('should set the double damage to', async () => {
      await shouldSetProperty(ground.doubleDamageTo, ground.name, (p) => p.doubleDamageTo);
    });

    it('should set the half damage from', async () => {
      await shouldSetProperty(ground.halfDamageFrom, ground.name, (p) => p.halfDamageFrom);
    });

    it('should set the double damage to', async () => {
      await shouldSetProperty(ground.halfDamageTo, ground.name, (p) => p.halfDamageTo);
    });

    it('should set the no damage from', async () => {
      await shouldSetProperty(ground.noDamageFrom, ground.name, (p) => p.noDamageFrom);
    });

    it('should set the no damage to', async () => {
      await shouldSetProperty(ground.noDamageTo, ground.name, (p) => p.noDamageTo);
    });
  });
});

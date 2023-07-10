import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IZType, ZTypeBuilder } from './type';
import { createTypeService } from './type-service';

describe('ZTypeService', () => {
  let api: Mocked<IPokeApi>;
  let ground: IZType;

  const createTestTarget = () => createTypeService(api);

  beforeEach(() => {
    ground = new ZTypeBuilder().ground().build();

    const _ground = {
      damage_relations: {
        double_damage_from: ground.doubleDamageFrom.map((d) => ({ name: d, url: '' })),
        double_damage_to: ground.doubleDamageTo.map((d) => ({ name: d, url: '' })),
        half_damage_from: ground.halfDamageFrom.map((d) => ({ name: d, url: '' })),
        half_damage_to: ground.halfDamageTo.map((d) => ({ name: d, url: '' })),
        no_damage_from: ground.noDamageFrom.map((d) => ({ name: d, url: '' })),
        no_damage_to: ground.noDamageTo.map((d) => ({ name: d, url: '' }))
      },
      game_indices: [],
      generation: { name: '', url: '' },
      id: 0,
      move_damage_class: { name: '', url: '' },
      moves: [],
      name: ground.name,
      names: [],
      past_damage_relations: [],
      pokemon: []
    };

    const _typePage: IPokeApiPage = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: _ground.name, url: '' }]
    };

    api = mock<IPokeApi>();

    api.typeList.mockResolvedValue(_typePage);
    api.type.mockResolvedValue(_ground);
  });

  it('should retrieve all pokemon', async () => {
    const request = new ZDataRequestBuilder().build();
    const actual = await createTestTarget().retrieve(request);
    expect(actual).toEqual([ground]);
  });

  it('should set the name', async () => {
    const actual = (await createTestTarget().get(ground.name)).name;
    expect(actual).toEqual(ground.name);
  });

  it('should set the double damage from', async () => {
    const actual = (await createTestTarget().get(ground.name)).doubleDamageFrom;
    expect(actual).toEqual(ground.doubleDamageFrom);
  });

  it('should set the double damage to', async () => {
    const actual = (await createTestTarget().get(ground.name)).doubleDamageTo;
    expect(actual).toEqual(ground.doubleDamageTo);
  });

  it('should set the half damage from', async () => {
    const actual = (await createTestTarget().get(ground.name)).halfDamageFrom;
    expect(actual).toEqual(ground.halfDamageFrom);
  });

  it('should set the half damage to', async () => {
    const actual = (await createTestTarget().get(ground.name)).halfDamageTo;
    expect(actual).toEqual(ground.halfDamageTo);
  });

  it('should set the no damage from', async () => {
    const actual = (await createTestTarget().get(ground.name)).noDamageFrom;
    expect(actual).toEqual(ground.noDamageFrom);
  });

  it('should set the no damage to', async () => {
    const actual = (await createTestTarget().get(ground.name)).noDamageTo;
    expect(actual).toEqual(ground.noDamageTo);
  });
});

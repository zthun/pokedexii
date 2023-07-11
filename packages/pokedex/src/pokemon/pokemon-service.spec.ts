import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { IPokeApiPokemon } from '../poke-api/poke-api-pokemon';
import { IPokeApiType } from '../poke-api/poke-api-type';
import { IZPokemon, ZPokemonBuilder } from '../pokemon/pokemon';
import { IZType, ZTypeBuilder } from '../type/type';
import { createPokemonService } from './pokemon-service';

describe('ZPokemonService', () => {
  let api: Mocked<IPokeApi>;
  let charizard: IZPokemon;
  let fire: IZType;
  let flying: IZType;
  let ground: IZType;

  const createTestTarget = () => createPokemonService(api);

  const createApiPokemon = (pokemon: IZPokemon): IPokeApiPokemon => ({
    abilities: [],
    base_experience: 1,
    forms: [],
    game_indices: [],
    height: pokemon.height,
    held_items: [],
    id: pokemon.id,
    is_default: true,
    location_area_encounters: '',
    moves: [],
    name: pokemon.name,
    order: 1,
    species: {
      name: 'pokemon',
      url: 'http://pokeapi/species/pokemon'
    },
    sprites: {
      other: {
        'official-artwork': {
          front_default: pokemon.artwork
        }
      }
    },
    stats: [
      {
        stat: { name: 'hp', url: 'http://pokeapi/stats/hp' },
        base_stat: pokemon.stats.hp.base,
        effort: pokemon.stats.hp.effort
      },
      {
        stat: { name: 'attack', url: 'http://pokeapi/stats/attack' },
        base_stat: pokemon.stats.attack.base,
        effort: pokemon.stats.attack.effort
      },
      {
        stat: { name: 'defense', url: 'http://pokeapi/stats/defense' },
        base_stat: pokemon.stats.defense.base,
        effort: pokemon.stats.defense.effort
      },
      {
        stat: { name: 'special-attack', url: 'http://pokeapi/stats/special-attack' },
        base_stat: pokemon.stats.specialAttack.base,
        effort: pokemon.stats.specialAttack.effort
      },
      {
        stat: { name: 'special-defense', url: 'http://pokeapi/stats/special-defense' },
        base_stat: pokemon.stats.specialDefense.base,
        effort: pokemon.stats.specialDefense.effort
      },
      {
        stat: { name: 'speed', url: 'http://pokeapi/stats/speed' },
        base_stat: pokemon.stats.speed.base,
        effort: pokemon.stats.speed.effort
      }
    ],
    types: (pokemon.types || []).map((t, i) => ({
      slot: i,
      type: {
        name: t,
        url: `http://pokeapi/types/${t}`
      }
    })),
    weight: pokemon.weight
  });

  const createApiType = (ground: IZType): IPokeApiType => ({
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
  });

  beforeEach(() => {
    charizard = new ZPokemonBuilder().charizard().build();
    fire = new ZTypeBuilder().fire().build();
    flying = new ZTypeBuilder().flying().build();
    ground = new ZTypeBuilder().ground().build();

    const _charizard = createApiPokemon(charizard);
    const _pokemonPage = createApiPage([charizard]);

    const _fire = createApiType(fire);
    const _flying = createApiType(flying);
    const _typePage = createApiPage([fire, ground, flying]);

    api = mock<IPokeApi>();

    api.pokemonList.mockResolvedValue(_pokemonPage);
    api.pokemon.mockResolvedValue(_charizard);

    api.typeList.mockResolvedValue(_typePage);
    api.type.mockResolvedValueOnce(_fire).mockResolvedValueOnce(_flying);
  });

  it('should retrieve all pokemon', async () => {
    const request = new ZDataRequestBuilder().build();
    const actual = await createTestTarget().retrieve(request);
    expect(actual).toEqual([charizard]);
  });

  it('should set the id', async () => {
    const actual = (await createTestTarget().get(charizard.name)).id;
    expect(actual).toEqual(charizard.id);
  });

  it('should set the name', async () => {
    const actual = (await createTestTarget().get(charizard.name)).name;
    expect(actual).toEqual(charizard.name);
  });

  it('should set the artwork', async () => {
    const actual = (await createTestTarget().get(charizard.name)).artwork;
    expect(actual).toEqual(charizard.artwork);
  });

  it('should set the types', async () => {
    const actual = (await createTestTarget().get(charizard.name)).types;
    expect(actual).toEqual(charizard.types);
  });

  it('should set the hp stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.hp;
    expect(actual).toEqual(charizard.stats.hp);
  });

  it('should set the attack stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.attack;
    expect(actual).toEqual(charizard.stats.attack);
  });

  it('should set the defense stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.defense;
    expect(actual).toEqual(charizard.stats.defense);
  });

  it('should set the special attack stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.specialAttack;
    expect(actual).toEqual(charizard.stats.specialAttack);
  });

  it('should set the special defense stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.specialDefense;
    expect(actual).toEqual(charizard.stats.specialDefense);
  });

  it('should set the speed stat', async () => {
    const actual = (await createTestTarget().get(charizard.name)).stats.speed;
    expect(actual).toEqual(charizard.stats.speed);
  });

  it('should set the height', async () => {
    const actual = (await createTestTarget().get(charizard.name)).height;
    expect(actual).toEqual(charizard.height);
  });

  it('should set the weight', async () => {
    const actual = (await createTestTarget().get(charizard.name)).weight;
    expect(actual).toEqual(charizard.weight);
  });

  it('should set the weaknesses', async () => {
    const actual = (await createTestTarget().get(charizard.name)).weaknesses;
    expect(actual).toEqual(charizard.weaknesses);
  });
});

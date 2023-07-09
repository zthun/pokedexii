import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IZPokemon, ZPokemonBuilder } from '../pokemon/pokemon';
import { createPokemonService } from './pokemon-service';

describe('ZPokemonService', () => {
  let api: Mocked<IPokeApi>;
  let bulbasaur: IZPokemon;

  const createTestTarget = () => createPokemonService(api);

  beforeEach(() => {
    bulbasaur = new ZPokemonBuilder().bulbasaur().build();

    const _bulbasaur = {
      abilities: [],
      base_experience: 1,
      forms: [],
      game_indices: [],
      height: bulbasaur.height,
      held_items: [],
      id: bulbasaur.id,
      is_default: true,
      location_area_encounters: '',
      moves: [],
      name: bulbasaur.name,
      order: 1,
      species: {
        name: 'pokemon',
        url: 'http://pokeapi/species/pokemon'
      },
      sprites: {
        other: {
          'official-artwork': {
            front_default: bulbasaur.artwork
          }
        }
      },
      stats: [
        {
          stat: { name: 'hp', url: 'http://pokeapi/stats/hp' },
          base_stat: bulbasaur.stats.hp.base,
          effort: bulbasaur.stats.hp.effort
        },
        {
          stat: { name: 'attack', url: 'http://pokeapi/stats/attack' },
          base_stat: bulbasaur.stats.attack.base,
          effort: bulbasaur.stats.attack.effort
        },
        {
          stat: { name: 'defense', url: 'http://pokeapi/stats/defense' },
          base_stat: bulbasaur.stats.defense.base,
          effort: bulbasaur.stats.defense.effort
        },
        {
          stat: { name: 'special-attack', url: 'http://pokeapi/stats/special-attack' },
          base_stat: bulbasaur.stats.specialAttack.base,
          effort: bulbasaur.stats.specialAttack.effort
        },
        {
          stat: { name: 'special-defense', url: 'http://pokeapi/stats/special-defense' },
          base_stat: bulbasaur.stats.specialDefense.base,
          effort: bulbasaur.stats.specialDefense.effort
        },
        {
          stat: { name: 'speed', url: 'http://pokeapi/stats/speed' },
          base_stat: bulbasaur.stats.speed.base,
          effort: bulbasaur.stats.speed.effort
        }
      ],
      types: (bulbasaur.types || []).map((t, i) => ({
        slot: i,
        type: {
          name: t,
          url: `http://pokeapi/types/${t}`
        }
      })),
      weight: bulbasaur.weight
    };

    const _pokePage: IPokeApiPage = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: bulbasaur.name, url: '' }]
    };

    api = mock<IPokeApi>();

    api.pokemons.mockResolvedValue(_pokePage);
    api.pokemon.mockResolvedValue(_bulbasaur);
  });

  it('should retrieve all pokemon', async () => {
    const request = new ZDataRequestBuilder().build();
    const actual = await createTestTarget().retrieve(request);
    expect(actual).toEqual([bulbasaur]);
  });

  it('should set the id', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).id;
    expect(actual).toEqual(bulbasaur.id);
  });

  it('should set the name', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).name;
    expect(actual).toEqual(bulbasaur.name);
  });

  it('should set the artwork', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).artwork;
    expect(actual).toEqual(bulbasaur.artwork);
  });

  it('should set the types', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).types;
    expect(actual).toEqual(bulbasaur.types);
  });

  it('should set the hp stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.hp;
    expect(actual).toEqual(bulbasaur.stats.hp);
  });

  it('should set the attack stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.attack;
    expect(actual).toEqual(bulbasaur.stats.attack);
  });

  it('should set the defense stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.defense;
    expect(actual).toEqual(bulbasaur.stats.defense);
  });

  it('should set the special attack stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.specialAttack;
    expect(actual).toEqual(bulbasaur.stats.specialAttack);
  });

  it('should set the special defense stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.specialDefense;
    expect(actual).toEqual(bulbasaur.stats.specialDefense);
  });

  it('should set the speed stat', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).stats.speed;
    expect(actual).toEqual(bulbasaur.stats.speed);
  });

  it('should set the height', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).height;
    expect(actual).toEqual(bulbasaur.height);
  });

  it('should set the weight', async () => {
    const actual = (await createTestTarget().get(bulbasaur.name)).weight;
    expect(actual).toEqual(bulbasaur.weight);
  });
});

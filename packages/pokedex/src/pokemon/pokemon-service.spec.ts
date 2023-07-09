import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { keyBy } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { IPokeApiPage } from '../poke-api/poke-api-page';
import { IPokeApiPokemon } from '../poke-api/poke-api-pokemon';
import { IZPokemon, ZPokemonBuilder } from './pokemon';
import { ZPokemonServiceApi } from './pokemon-service';

describe('ZPokemonService', () => {
  let api: Mocked<IPokeApi>;
  let bulbasaur: IZPokemon;
  let charmander: IZPokemon;
  let squirtle: IZPokemon;
  let pikachu: IZPokemon;
  let pokemon: IZPokemon[];

  function createTestTarget() {
    return new ZPokemonServiceApi(api);
  }

  beforeEach(() => {
    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pikachu = new ZPokemonBuilder().pikachu().build();

    pokemon = [bulbasaur, charmander, squirtle, pikachu];

    const _pokeMap = keyBy<IPokeApiPokemon>(
      pokemon.map((p) => ({
        abilities: [],
        base_experience: 1,
        forms: [],
        game_indices: [],
        height: p.height,
        held_items: [],
        id: p.id,
        is_default: true,
        location_area_encounters: '',
        moves: [],
        name: p.name,
        order: 1,
        species: {
          name: 'pokemon',
          url: 'http://pokeapi/species/pokemon'
        },
        sprites: {
          other: {
            'official-artwork': {
              front_default: p.artwork
            }
          }
        },
        stats: [
          {
            stat: { name: 'hp', url: 'http://pokeapi/stats/hp' },
            base_stat: p.stats.hp.base,
            effort: p.stats.hp.effort
          },
          {
            stat: { name: 'attack', url: 'http://pokeapi/stats/attack' },
            base_stat: p.stats.attack.base,
            effort: p.stats.attack.effort
          },
          {
            stat: { name: 'defense', url: 'http://pokeapi/stats/defense' },
            base_stat: p.stats.defense.base,
            effort: p.stats.defense.effort
          },
          {
            stat: { name: 'special-attack', url: 'http://pokeapi/stats/special-attack' },
            base_stat: p.stats.specialAttack.base,
            effort: p.stats.specialAttack.effort
          },
          {
            stat: { name: 'special-defense', url: 'http://pokeapi/stats/special-defense' },
            base_stat: p.stats.specialDefense.base,
            effort: p.stats.specialDefense.effort
          },
          {
            stat: { name: 'speed', url: 'http://pokeapi/stats/speed' },
            base_stat: p.stats.speed.base,
            effort: p.stats.speed.effort
          }
        ],
        types: (p.types || []).map((t, i) => ({
          slot: i,
          type: {
            name: t,
            url: `http://pokeapi/types/${t}`
          }
        })),
        weight: p.weight
      })),
      (p) => p.name
    );

    const _pokePage: IPokeApiPage = {
      count: pokemon.length,
      next: null,
      previous: null,
      results: pokemon.map((p) => ({
        name: p.name,
        url: `http://pokeapi/pokemon/${p.id}`
      }))
    };

    api = mock<IPokeApi>();

    api.pokemons.mockResolvedValue(_pokePage);
    api.pokemon.mockImplementation((name) =>
      _pokeMap[name] ? Promise.resolve(_pokeMap[name]) : Promise.reject('Pokemon not found')
    );
  });

  describe('List', () => {
    it('should retrieve the correct count of pokemon', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      // Act.
      const actual = await target.count(request);
      // Assert.
      expect(actual).toEqual(pokemon.length);
    });

    it('should retrieve the correct page of pokemon', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      const expected = [squirtle, pikachu];
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
      expect(api.pokemons).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get', () => {
    const shouldSetProperty = async <T>(expected: T, name: string, propertyFn: (p: IZPokemon) => T) => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const pkm = await target.get(name);
      const actual = propertyFn(pkm);
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the id', async () => {
      await shouldSetProperty(bulbasaur.id, bulbasaur.name, (p) => p.id);
    });

    it('should set the name', async () => {
      await shouldSetProperty(bulbasaur.name, bulbasaur.name, (p) => p.name);
    });

    it('should set the artwork', async () => {
      await shouldSetProperty(bulbasaur.artwork, bulbasaur.name, (p) => p.artwork);
    });

    it('should set the types', async () => {
      await shouldSetProperty(bulbasaur.types, bulbasaur.name, (p) => p.types);
    });

    it('should set the hp stat', async () => {
      await shouldSetProperty(bulbasaur.stats.hp, bulbasaur.name, (p) => p.stats.hp);
    });

    it('should set the attack stat', async () => {
      await shouldSetProperty(bulbasaur.stats.attack, bulbasaur.name, (p) => p.stats.attack);
    });

    it('should set the defense stat', async () => {
      await shouldSetProperty(bulbasaur.stats.defense, bulbasaur.name, (p) => p.stats.defense);
    });

    it('should set the special attack stat', async () => {
      await shouldSetProperty(bulbasaur.stats.specialAttack, bulbasaur.name, (p) => p.stats.specialAttack);
    });

    it('should set the special defense stat', async () => {
      await shouldSetProperty(bulbasaur.stats.specialDefense, bulbasaur.name, (p) => p.stats.specialDefense);
    });

    it('should set the speed stat', async () => {
      await shouldSetProperty(bulbasaur.stats.speed, bulbasaur.name, (p) => p.stats.speed);
    });

    it('should set the height', async () => {
      await shouldSetProperty(bulbasaur.height, bulbasaur.name, (p) => p.height);
    });

    it('should set the weight', async () => {
      await shouldSetProperty(bulbasaur.weight, bulbasaur.name, (p) => p.weight);
    });
  });
});

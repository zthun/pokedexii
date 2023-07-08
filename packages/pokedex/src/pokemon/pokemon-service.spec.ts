import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { keyBy } from 'lodash';
import { Mocked, beforeEach, describe, expect, it, vi } from 'vitest';
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
        height: 1,
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
        stats: [],
        types: (p.types || []).map((t, i) => ({
          slot: i,
          type: {
            name: t,
            url: `http://pokeapi/types/${t}`
          }
        })),
        weight: 1
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

    api = vi.mocked<IPokeApi>({
      pokemon: vi.fn(),
      pokemons: vi.fn()
    });

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
  });

  describe('Get', () => {
    it('should retrieve the requested pokemon by name', async () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = await target.get(bulbasaur.name);
      // Assert.
      expect(actual).toEqual(bulbasaur);
    });
  });
});

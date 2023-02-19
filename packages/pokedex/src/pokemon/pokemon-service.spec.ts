import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import { ZDataRequestBuilder } from 'src/source/data-request';
import { beforeEach, describe, expect, it } from 'vitest';
import { IZPokemon, ZPokemonBuilder } from './pokemon';
import { ZPokemonServiceHttp } from './pokemon-service';

describe('ZPokemonService', () => {
  let http: ZHttpServiceMock;
  let bulbasaur: IZPokemon;
  let charmander: IZPokemon;
  let squirtle: IZPokemon;
  let pikachu: IZPokemon;
  let pokemon: IZPokemon[];

  function createTestTarget() {
    return new ZPokemonServiceHttp(http);
  }

  beforeEach(() => {
    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pikachu = new ZPokemonBuilder().build();

    pokemon = [bulbasaur, charmander, squirtle, pikachu];
    const pokemonPage = pokemon.map((p) => ({
      name: p.name,
      url: `http://pokeapi/pokemon/${p.id}`
    }));

    http = new ZHttpServiceMock();

    let result = new ZHttpResultBuilder().data({ count: pokemon.length }).build();
    let endpoint = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', '1').build();
    http.set<{ count: number }>(endpoint, ZHttpMethod.Get, result);

    result = new ZHttpResultBuilder().data({ results: pokemonPage }).build();
    endpoint = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).param('limit', `${pokemon.length}`).build();
    http.set(endpoint, ZHttpMethod.Get, result);
  });

  describe('List', () => {
    it('should retrieve the correct page of pokemon', async () => {
      // Arrange.
      const target = createTestTarget();
      const request = new ZDataRequestBuilder().page(2).size(2).build();
      const expected = [squirtle, pikachu];
      // Act.
      const actual = await target.list(request);
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Get', () => {
    beforeEach(() => {
      const result = new ZHttpResultBuilder().data(bulbasaur).build();
      let endpoint = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).append(`${bulbasaur.id}`).build();
      http.set(endpoint, ZHttpMethod.Get, result);
      endpoint = new ZUrlBuilder().parse(ZPokemonServiceHttp.Endpoint).append(`${bulbasaur.name}`).build();
      http.set(endpoint, ZHttpMethod.Get, result);
    });

    it('should retrieve the requested pokemon by id', async () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      const actual = await target.get(bulbasaur.id);
      // Assert.
      expect(actual).toEqual(bulbasaur);
    });

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

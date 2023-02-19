import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mocked } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokemonServiceContext } from '../pokemon/pokemon-service';
import { ZPokedexListPage } from './pokedex-list-page';
import { ZPokedexListPageComponentModel } from './pokedex-list-page.cm';

describe('ZPokedexListPage', () => {
  let pokemonService: Mocked<IZPokemonService>;
  let bulbasaur: IZPokemon;
  let charmander: IZPokemon;
  let squirtle: IZPokemon;
  let pikachu: IZPokemon;
  let pokemon: IZPokemon[];
  let history: MemoryHistory;
  let size: number | undefined;

  async function createTestTarget() {
    const element = (
      <Router navigator={history} location={history.location}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZPokedexListPage size={size} />
        </ZPokemonServiceContext.Provider>
      </Router>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokedexListPageComponentModel);
    await target.wait();
    return target;
  }

  beforeEach(() => {
    size = undefined;
    history = createMemoryHistory();

    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pikachu = new ZPokemonBuilder().pikachu().build();
    pokemon = [bulbasaur, charmander, squirtle, pikachu];

    pokemonService = mock<IZPokemonService>();
    pokemonService.list.mockResolvedValue(pokemon);
    pokemonService.count.mockResolvedValue(pokemon.length);
  });

  describe('Error', () => {
    it('should handle errors if the pokemon service fails to return the pokemon list', async () => {
      // Arrange.
      pokemonService.list.mockRejectedValue(new Error('Could not retrieve list'));
      const target = await createTestTarget();
      // Act.
      const actual = await target.error();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Cards', () => {
    it('should render a page of cards', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = (await target.pokemon()).length;
      // Assert.
      expect(actual).toBeGreaterThan(0);
    });

    it('should render card ids on the page', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act
      const card = await target.pokemon(squirtle.id);
      const actual = await card.who();
      // Assert
      expect(actual).toEqual(squirtle);
    });

    it('should render card names on the page', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act
      const card = await target.pokemon(squirtle.name);
      const actual = await card.who();
      // Assert
      expect(actual).toEqual(squirtle);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      size = 3;
    });

    it('should navigate to the next page', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.jump(1);
      const actual = await target.next();
      // Assert.
      expect(actual).toEqual(2);
    });

    it('should navigate to the previous page', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await target.jump(2);
      const actual = await target.prev();
      // Assert.
      expect(actual).toEqual(1);
    });

    it('should load the appropriate cards on the requested page', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const page = await target.next();
      // Assert.
      expect(pokemonService.list).toHaveBeenCalledWith(expect.objectContaining({ page }));
    });

    it('should navigate to the individual pokemon page when a card is clicked', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const card = await target.pokemon(squirtle.name);
      await card.click();
      // Assert.
      expect(history.location.pathname).toEqual(`/pokemon/${squirtle.name}`);
    });
  });
});

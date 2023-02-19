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
  let pokemon: IZPokemon[];
  let history: MemoryHistory;

  async function createTestTarget() {
    const element = (
      <Router navigator={history} location={history.location}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZPokedexListPage />
        </ZPokemonServiceContext.Provider>
      </Router>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokedexListPageComponentModel);
    await target.wait();
    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();

    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pokemon = [bulbasaur, charmander, squirtle];

    pokemonService = mock<IZPokemonService>();
    pokemonService.list.mockResolvedValue(pokemon);
  });

  it('should render a page of cards', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = (await target.pokemon()).length;
    // Assert.
    expect(actual).toBeGreaterThan(0);
  });

  it('should handle errors if the pokemon service fails to return the pokemon list', async () => {
    // Arrange.
    pokemonService.list.mockRejectedValue(new Error('Could not retrieve list'));
    const target = await createTestTarget();
    // Act.
    const actual = await target.error();
    // Assert.
    expect(actual).toBeTruthy();
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

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
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
    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();

    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pikachu = new ZPokemonBuilder().pikachu().build();
    pokemon = [bulbasaur, charmander, squirtle, pikachu];

    pokemonService = mock<IZPokemonService>();
    pokemonService.retrieve.mockResolvedValue(pokemon);
    pokemonService.count.mockResolvedValue(pokemon.length);
  });

  it('should render the component', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});

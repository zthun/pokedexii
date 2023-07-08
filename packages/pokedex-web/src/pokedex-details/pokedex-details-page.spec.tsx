import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import { History, createMemoryHistory } from 'history';
import React from 'react';
import { createPokemonTheme } from 'src/pokemon-theme/pokemon-theme';
import { ZPokemonServiceContext } from 'src/pokemon/pokemon-service';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokedexDetailsPage } from './pokedex-details-page';
import { ZPokedexDetailsPageComponentModel } from './pokedex-details-page.cm';

describe('ZPokedexDetailsPage', () => {
  let history: History;
  let pokemonService: Mocked<IZPokemonService>;
  let squirtle: IZPokemon;

  async function createTestTarget() {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZTestRouter navigator={history} location={history.location}>
            <ZPokedexDetailsPage />
          </ZTestRouter>
        </ZPokemonServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return await ZCircusBy.first(driver, ZPokedexDetailsPageComponentModel);
  }

  beforeEach(() => {
    squirtle = new ZPokemonBuilder().squirtle().build();
    history = createMemoryHistory({ initialEntries: [`/pokemon/${squirtle.name}`] });

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(squirtle);
  });

  it('should render the page', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import { History, createMemoryHistory } from 'history';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZPokemonDetailsPage } from './pokemon-details-page';
import { ZPokemonDetailsPageComponentModel } from './pokemon-details-page.cm';
import { ZPokemonServiceContext } from './pokemon-service';

describe('ZPokedexDetailsPage', () => {
  let history: History;
  let pokemonService: Mocked<IZPokemonService>;
  let charizard: IZPokemon;

  async function createTestTarget() {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZTestRouter navigator={history} location={history.location}>
            <ZPokemonDetailsPage />
          </ZTestRouter>
        </ZPokemonServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return await ZCircusBy.first(driver, ZPokemonDetailsPageComponentModel);
  }

  beforeEach(() => {
    charizard = new ZPokemonBuilder().charizard().build();
    history = createMemoryHistory({ initialEntries: [`/pokemon/${charizard.name}`] });

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(charizard);
  });

  it('should render the page', async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});

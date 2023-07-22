import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import {
  IZEvolutionNode,
  IZPokemon,
  IZPokemonService,
  IZSpecies,
  IZSpeciesService,
  ZEvolutionNodeBuilder,
  ZPokemonBuilder,
  ZSpeciesBuilder
} from '@zthun/pokedex';
import { MemoryHistory, createMemoryHistory } from 'history';
import { startCase } from 'lodash';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokemonServiceContext } from '../pokemon/pokemon-service';
import { ZSpeciesServiceContext } from '../species/species-service';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZEvolutionNodeBubble } from './evolution-node-bubble';
import { ZEvolutionNodeBubbleComponentModel } from './evolution-node-bubble.cm';

describe('ZEvolutionNodeBubble', () => {
  let node: IZEvolutionNode;
  let gardevoir$: IZSpecies;
  let gardevoir: IZPokemon;
  let history: MemoryHistory;

  let speciesService: Mocked<IZSpeciesService>;
  let pokemonService: Mocked<IZPokemonService>;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZPokemonServiceContext.Provider value={pokemonService}>
            <ZTestRouter navigator={history} location={history.location}>
              <ZEvolutionNodeBubble node={node} />
            </ZTestRouter>
          </ZPokemonServiceContext.Provider>
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZEvolutionNodeBubbleComponentModel);
    await target.load();
    return target;
  };

  beforeEach(() => {
    history = createMemoryHistory();

    node = new ZEvolutionNodeBuilder().gardevoir().build();

    gardevoir$ = new ZSpeciesBuilder().gardevoir().build();
    gardevoir = new ZPokemonBuilder().gardevoir().build();

    speciesService = mock<IZSpeciesService>();
    speciesService.get.mockResolvedValue(gardevoir$);

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(gardevoir);
  });

  describe('Error', () => {
    it('should render the error pokemon name if the species fails to load.', async () => {
      // Arrange.
      speciesService.get.mockRejectedValue(new Error('Game Over'));
      const target = await createTestTarget();
      const expected = startCase(new ZSpeciesBuilder().build().name);
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render the error pokemon name if the variant fails to load.', async () => {
      // Arrange.
      pokemonService.get.mockRejectedValue(new Error('Game Over'));
      const target = await createTestTarget();
      const expected = startCase(new ZSpeciesBuilder().build().name);
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Success', () => {
    it('should render the species name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(startCase(gardevoir.name));
    });

    it('click should navigate you to the selected species', async () => {
      // Arrange.
      const expected = `/pokemon/${gardevoir$.name}`;
      const target = await createTestTarget();
      const bubble = await target.bubble();
      // Act.
      await bubble.click();
      const actual = history.location.pathname;
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});

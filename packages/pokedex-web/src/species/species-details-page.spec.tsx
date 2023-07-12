import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZRoute, ZRouteMap, ZTestRouter } from '@zthun/fashion-boutique';
import {
  IZPokemon,
  IZPokemonService,
  IZSpecies,
  IZSpeciesService,
  ZPokemonBuilder,
  ZSpeciesBuilder
} from '@zthun/pokedex';
import { History, createMemoryHistory } from 'history';
import { padStart, startCase } from 'lodash';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokemonServiceContext } from '../pokemon/pokemon-service';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZSpeciesDetailsPage } from './species-details-page';
import { ZSpeciesDetailsPageComponentModel } from './species-details-page.cm';
import { ZSpeciesServiceContext } from './species-service';

describe('ZSpeciesDetailsPage', () => {
  let history: History;
  let pokemonService: Mocked<IZPokemonService>;
  let speciesService: Mocked<IZSpeciesService>;
  let charizard$: IZSpecies;
  let charizard: IZPokemon;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZPokemonServiceContext.Provider value={pokemonService}>
            <ZTestRouter navigator={history} location={history.location}>
              <ZRouteMap>
                <ZRoute path='/pokemon/:name' element={<ZSpeciesDetailsPage />} />
                <ZRoute path='/not-pokemon' element={<ZSpeciesDetailsPage />} />
              </ZRouteMap>
            </ZTestRouter>
          </ZPokemonServiceContext.Provider>
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZSpeciesDetailsPageComponentModel);
    await target.load();
    return target;
  };

  beforeEach(() => {
    charizard$ = new ZSpeciesBuilder().charizard().build();
    charizard = new ZPokemonBuilder().charizard().build();
    history = createMemoryHistory({ initialEntries: [`/pokemon/${charizard.name}`] });

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(charizard);

    speciesService = mock<IZSpeciesService>();
    speciesService.get.mockResolvedValue(charizard$);
  });

  describe('Error', () => {
    it('should render a NotFound component if the pokemon cannot be found', async () => {
      // Arrange.
      pokemonService.get.mockRejectedValue(new Error('Game Over!'));
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should render a NotFound if the species cannot be found', async () => {
      // Arrange.
      speciesService.get.mockRejectedValue(new Error('Game Over!'));
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should render NotFound if the name cannot be parsed from the path', async () => {
      // Arrange.
      history = createMemoryHistory({ initialEntries: [`/not-pokemon`] });
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Pokemon', () => {
    it('should render the pokemon name', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(startCase(charizard.name));
    });

    it('should render the pokemon id', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = `#${padStart(String(charizard.id), 4, '0')}`;
      // Act.
      const actual = await target.id();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render the pokemon artwork', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.artwork();
      // Assert.
      expect(actual).toEqual(charizard.artwork);
    });
  });

  describe('Attributes', () => {
    it('should render the attributes of the pokemon', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.attributes();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Stats', () => {
    it('should render the stats of the pokemon', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.stats();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});

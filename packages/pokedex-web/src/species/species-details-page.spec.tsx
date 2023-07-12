import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZRoute, ZRouteMap, ZTestRouter } from '@zthun/fashion-boutique';
import { IZSpecies, IZSpeciesService, ZSpeciesBuilder } from '@zthun/pokedex';
import { History, createMemoryHistory } from 'history';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZSpeciesDetailsPage } from './species-details-page';
import { ZSpeciesDetailsPageComponentModel } from './species-details-page.cm';
import { ZSpeciesServiceContext } from './species-service';

describe('ZSpeciesDetailsPage', () => {
  let history: History;
  let speciesService: Mocked<IZSpeciesService>;
  let charizard: IZSpecies;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZTestRouter navigator={history} location={history.location}>
            <ZRouteMap>
              <ZRoute path='/pokemon/:name' element={<ZSpeciesDetailsPage />} />
              <ZRoute path='/not-pokemon' element={<ZSpeciesDetailsPage />} />
            </ZRouteMap>
          </ZTestRouter>
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZSpeciesDetailsPageComponentModel);
    await target.load();
    return target;
  };

  beforeEach(() => {
    charizard = new ZSpeciesBuilder().charizard().build();
    history = createMemoryHistory({ initialEntries: [`/pokemon/${charizard.name}`] });
    speciesService = mock<IZSpeciesService>();
    speciesService.get.mockResolvedValue(charizard);
  });

  it('should render the correct species', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.species();
    // Assert.
    expect(actual).toEqual(charizard.name);
  });

  describe('Error', () => {
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

  describe('Varieties', () => {
    it('should render the varieties card', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.varieties();
      // Assert.
      expect(actual).toBeTruthy();
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

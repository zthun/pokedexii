import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZChartComponentModel, ZFashionThemeContext, ZRoute, ZRouteMap, ZTestRouter } from '@zthun/fashion-boutique';
import { IZPokemon, IZPokemonService, ZPokemonBuilder, ZType } from '@zthun/pokedex';
import { History, createMemoryHistory } from 'history';
import { padStart, startCase } from 'lodash';
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

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZTestRouter navigator={history} location={history.location}>
            <ZRouteMap>
              <ZRoute path='/pokemon/:name' element={<ZPokemonDetailsPage />} />
              <ZRoute path='/not-pokemon' element={<ZPokemonDetailsPage />} />
            </ZRouteMap>
          </ZTestRouter>
        </ZPokemonServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokemonDetailsPageComponentModel);
    await target.load();
    return target;
  };

  beforeEach(() => {
    charizard = new ZPokemonBuilder().charizard().build();
    history = createMemoryHistory({ initialEntries: [`/pokemon/${charizard.name}`] });

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(charizard);
  });

  describe('Error', () => {
    beforeEach(() => {
      pokemonService.get.mockRejectedValue(new Error('Game Over!'));
    });

    it('should render a NotFound component if the page errors', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should render missingno if the name cannot be parsed from the path', async () => {
      // Arrange.
      history = createMemoryHistory({ initialEntries: [`/not-pokemon`] });
      const target = await createTestTarget();
      const missingno = new ZPokemonBuilder().build();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(startCase(missingno.name));
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
    it('should render the pokemon height in feet and inches', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = `5' 7"`;
      // Act.
      const actual = await target.height();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render the pokemon weight in lbs', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = `199.51 lbs`;
      // Act.
      const actual = await target.weight();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should render the pokemon types', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const badges = await target.types();
      const actual = await Promise.all(badges.map((b) => b.type()));
      // Assert.
      expect(actual).toEqual(charizard.types);
    });

    it('should render the pokemon weaknesses', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = charizard.weaknesses.map((w) => w.type);
      // Act.
      const badges = await target.weaknesses();
      const actual = await Promise.all(badges.map((b) => b.type()));
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should not render weaknesses for which there are none', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.weakness(ZType.Fire);
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should not render any damage multiplier if the damage is less than 4x', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.has4xDamage(ZType.Electric);
      // Assert.
      expect(actual).toBeFalsy();
    });

    it('should render weakness and notify when there is 4x the damage', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.has4xDamage(ZType.Rock);
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Stats', () => {
    const shouldRenderStat = async (
      expected: number,
      chart: (target: ZPokemonDetailsPageComponentModel) => Promise<ZChartComponentModel>
    ) => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const _chart = await chart(target);
      const [point] = await _chart.points();
      const { x: actual } = point;
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should render hp', async () => {
      await shouldRenderStat(charizard.stats.hp.base, (t) => t.hp());
    });

    it('should render attack', async () => {
      await shouldRenderStat(charizard.stats.attack.base, (t) => t.attack());
    });

    it('should render defense', async () => {
      await shouldRenderStat(charizard.stats.defense.base, (t) => t.defense());
    });

    it('should render special attack', async () => {
      await shouldRenderStat(charizard.stats.specialAttack.base, (t) => t.specialAttack());
    });

    it('should render special defense', async () => {
      await shouldRenderStat(charizard.stats.specialDefense.base, (t) => t.specialDefense());
    });

    it('should render speed', async () => {
      await shouldRenderStat(charizard.stats.speed.base, (t) => t.speed());
    });
  });
});

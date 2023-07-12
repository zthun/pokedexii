import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZChartComponentModel, ZFashionThemeContext } from '@zthun/fashion-boutique';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZPokemonServiceContext } from './pokemon-service';
import { ZPokemonStatsCard } from './pokemon-stats-card';
import { ZPokemonStatsCardComponentModel } from './pokemon-stats-card.cm';

describe('ZPokemonStatsCard', () => {
  let pokemonService: Mocked<IZPokemonService>;
  let charizard: IZPokemon;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZPokemonStatsCard pokemonName={charizard.name} />
        </ZPokemonServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokemonStatsCardComponentModel);
    await target.asResourceCard().load();
    return target;
  };

  beforeEach(() => {
    charizard = new ZPokemonBuilder().charizard().build();

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockResolvedValue(charizard);
  });

  it('loads the correct pokemon', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.pokemon();
    // Assert.
    expect(actual).toEqual(charizard.name);
  });

  describe('Stats', () => {
    const shouldRenderStat = async (
      expected: number,
      chart: (target: ZPokemonStatsCardComponentModel) => Promise<ZChartComponentModel>
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

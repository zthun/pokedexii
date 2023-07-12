import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext } from '@zthun/fashion-boutique';
import { ZDataRequestBuilder, ZDataSourceStatic, ZFilterBinaryBuilder } from '@zthun/helpful-query';
import {
  IZPokemon,
  IZPokemonService,
  IZSpecies,
  IZSpeciesService,
  ZPokemonBuilder,
  ZSpeciesBuilder
} from '@zthun/pokedex';
import React from 'react';
import { Mock, Mocked, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZSpeciesServiceContext } from './species-service';
import { ZSpeciesVarietiesCard } from './species-varieties-card';
import { ZSpeciesVarietiesCardComponentModel } from './species-varieties-card.cm';

describe('ZSpeciesVarietiesCard', () => {
  let speciesService: Mocked<IZSpeciesService>;
  let pokemonService: Mocked<IZPokemonService>;
  let charizard$: IZSpecies;
  let charizard: IZPokemon;
  let charizardMegaX: IZPokemon;
  let charizardMegaY: IZPokemon;
  let charizardGmax: IZPokemon;
  let value: number | undefined;
  let onValueChange: Mock | undefined;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZSpeciesVarietiesCard speciesName={charizard$.name} value={value} onValueChange={onValueChange} />
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZSpeciesVarietiesCardComponentModel);
    await target.asResourceCard().load();
    return target;
  };

  beforeEach(() => {
    value = undefined;
    onValueChange = undefined;

    charizard$ = new ZSpeciesBuilder().charizard().build();
    charizard = new ZPokemonBuilder().charizard().build();
    charizardMegaX = new ZPokemonBuilder().charizard().name('charizard-mega-x').id(10034).build();
    charizardMegaY = new ZPokemonBuilder().charizard().name('charizard-mega-y').id(10035).build();
    charizardGmax = new ZPokemonBuilder().charizard().name('charizard-gmax').id(10196).build();

    speciesService = mock<IZSpeciesService>();
    speciesService.get.mockResolvedValue(charizard$);

    const pokemon = new ZDataSourceStatic([charizard, charizardMegaX, charizardMegaY, charizardGmax]);

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockImplementation(async (n) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(n).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [variety] = await pokemon.retrieve(request);
      return variety;
    });
  });

  it('should render the correct species', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.species();
    // Assert.
    expect(actual).toEqual(charizard$.name);
  });

  describe('Variety', () => {
    it('should render the main variety first if no value index is specified', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.variety();
      // Assert.
      expect(actual).toEqual(charizard$.main);
    });

    it('should render the target value specified', async () => {
      // Arrange.
      value = 3;
      const target = await createTestTarget();
      // Act.
      const actual = await target.variety();
      // Assert.
      expect(actual).toEqual(charizardGmax.name);
    });

    it('should disable the previous button on the first variety', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const previous = await target.previous();
      const actual = await previous.disabled();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should disable the next button on the last variety', async () => {
      // Arrange.
      const target = await createTestTarget();
      const next = await target.next();
      // Act.
      await next.click();
      await next.click();
      await next.click();
      const actual = await next.disabled();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it('should navigate to the next variety', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      await (await target.next()).click();
      await target.asResourceCard().load();
      const actual = await target.variety();
      // Assert.
      expect(actual).toEqual(charizardMegaX.name);
    });

    it('should raise the onValueChange event when next is clicked', async () => {
      // Arrange.
      value = 1;
      onValueChange = vi.fn();
      const target = await createTestTarget();
      // Act.
      await (await target.next()).click();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(value + 1);
    });

    it('should navigate to the previous variety', async () => {
      // Arrange.
      const target = await createTestTarget();
      const next = await target.next();
      await next.click();
      await next.click();
      // Act.
      const prev = await target.previous();
      await prev.click();
      await target.asResourceCard().load();
      const actual = await target.variety();
      // Assert.
      expect(actual).toEqual(charizardMegaX.name);
    });

    it('should raise the onValueChange event when previous is clicked', async () => {
      // Arrange.
      value = 2;
      onValueChange = vi.fn();
      const target = await createTestTarget();
      // Act.
      const prev = await target.previous();
      await prev.click();
      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(value - 1);
    });
  });
});

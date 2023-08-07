import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext } from '@zthun/fashion-boutique';
import { IZPokemon, IZPokemonService, ZPokemonBuilder, ZType } from '@zthun/pokedex';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZPokemonAttributesCard } from './pokemon-attributes-card';
import { ZPokemonAttributesCardComponentModel } from './pokemon-attributes-card.cm';
import { ZPokemonServiceContext } from './pokemon-service';

describe('ZPokemonAttributesCard', () => {
  let pokemonService: Mocked<IZPokemonService>;
  let charizard: IZPokemon;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZPokemonAttributesCard pokemonName={charizard.name} />
        </ZPokemonServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokemonAttributesCardComponentModel);
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

    it('should render the pokemon abilities', async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = charizard.abilities.map((a) => a.name);
      // Act.
      const actual = await target.abilities();
      // Assert.
      expect(actual).toEqual(expected);
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
});

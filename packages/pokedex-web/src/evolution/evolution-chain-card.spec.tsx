import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext } from '@zthun/fashion-boutique';
import { ZDataRequestBuilder, ZDataSourceStatic, ZFilterBinaryBuilder } from '@zthun/helpful-query';
import {
  IZEvolution,
  IZEvolutionService,
  IZPokemon,
  IZPokemonService,
  IZSpecies,
  IZSpeciesService,
  ZEvolutionBuilder,
  ZPokemonBuilder,
  ZSpeciesBuilder
} from '@zthun/pokedex';
import { last } from 'lodash';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokemonServiceContext } from '../pokemon/pokemon-service';
import { ZSpeciesServiceContext } from '../species/species-service';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZEvolutionChainCard } from './evolution-chain-card';
import { ZEvolutionChainCardComponentModel } from './evolution-chain-card.cm';
import { ZEvolutionServiceContext } from './evolution-service';

describe('ZEvolutionChainCard', () => {
  let evolution: IZEvolution;
  let ralts$: IZSpecies;
  let kirlia$: IZSpecies;
  let gardevoir$: IZSpecies;
  let gallade$: IZSpecies;
  let ralts: IZPokemon;
  let kirlia: IZPokemon;
  let gardevoir: IZPokemon;
  let gallade: IZPokemon;

  let speciesService: Mocked<IZSpeciesService>;
  let pokemonService: Mocked<IZPokemonService>;
  let evolutionService: Mocked<IZEvolutionService>;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZPokemonServiceContext.Provider value={pokemonService}>
            <ZEvolutionServiceContext.Provider value={evolutionService}>
              <ZEvolutionChainCard evolutionName={evolution.name}></ZEvolutionChainCard>;
            </ZEvolutionServiceContext.Provider>
          </ZPokemonServiceContext.Provider>
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZEvolutionChainCardComponentModel);
    await target.asResourceCard().load();
    return target;
  };

  beforeEach(() => {
    evolution = new ZEvolutionBuilder().ralts().build();

    ralts$ = new ZSpeciesBuilder().ralts().build();
    kirlia$ = new ZSpeciesBuilder().kirlia().build();
    gardevoir$ = new ZSpeciesBuilder().gardevoir().build();
    gallade$ = new ZSpeciesBuilder().gallade().build();

    ralts = new ZPokemonBuilder().ralts().build();
    kirlia = new ZPokemonBuilder().kirlia().build();
    gardevoir = new ZPokemonBuilder().gardevoir().build();
    gallade = new ZPokemonBuilder().gallade().build();

    evolutionService = mock<IZEvolutionService>();
    evolutionService.get.mockResolvedValue(evolution);

    const species = new ZDataSourceStatic([ralts$, kirlia$, gardevoir$, gallade$]);
    speciesService = mock<IZSpeciesService>();
    speciesService.get.mockImplementation(async (name) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(name).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await species.retrieve(request);
      return result;
    });

    const pokemon = new ZDataSourceStatic([ralts, kirlia, gardevoir, gallade]);
    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockImplementation(async (name) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(name).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await pokemon.retrieve(request);
      return result;
    });
  });

  describe('Nodes', () => {
    it('should render all nodes in the evolution chain', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const chain = await target.nodes();
      // Assert.
      expect(chain.length).toEqual(3);
    });

    it('should render the different evolutions separated by carousel', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const chain = await target.nodes();
      const final = last(chain)!;
      const current = await final.current();
      await current.load();
      const actual = await current.species();
      // Assert
      expect(actual).toEqual(gardevoir.name);
    });

    it('should navigate between evolution options', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const chain = await target.nodes();
      const final = last(chain)!;
      const carousel = await final.carousel();
      await (await carousel.forward()).click();
      const current = await final.current();
      await current.load();
      const actual = await current.species();
      // Assert.
      expect(actual).toEqual(gallade.name);
    });
  });
});

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import { ZDataRequestBuilder, ZDataSourceStatic, ZFilterBinaryBuilder } from '@zthun/helpful-query';
import { IZEvolution, IZSpecies, ZEvolutionBuilder, ZSpeciesBuilder } from '@zthun/pokedex';
import { MemoryHistory, createMemoryHistory } from 'history';
import { last } from 'lodash';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IZResourceService } from '../resource/resource-service';
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
  let history: MemoryHistory;

  let speciesService: Mocked<IZResourceService<IZSpecies>>;
  let evolutionService: Mocked<IZResourceService<IZEvolution>>;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZSpeciesServiceContext.Provider value={speciesService}>
          <ZEvolutionServiceContext.Provider value={evolutionService}>
            <ZTestRouter navigator={history} location={history.location}>
              <ZEvolutionChainCard evolutionName={evolution.name}></ZEvolutionChainCard>;
            </ZTestRouter>
          </ZEvolutionServiceContext.Provider>
        </ZSpeciesServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZEvolutionChainCardComponentModel);
    await target.asResourceCard().load();
    return target;
  };

  beforeEach(() => {
    history = createMemoryHistory();

    evolution = new ZEvolutionBuilder().ralts().build();

    ralts$ = new ZSpeciesBuilder().ralts().build();
    kirlia$ = new ZSpeciesBuilder().kirlia().build();
    gardevoir$ = new ZSpeciesBuilder().gardevoir().build();
    gallade$ = new ZSpeciesBuilder().gallade().build();

    evolutionService = mock<IZResourceService<IZEvolution>>();
    evolutionService.get.mockResolvedValue(evolution);

    const species = new ZDataSourceStatic([ralts$, kirlia$, gardevoir$, gallade$]);
    speciesService = mock<IZResourceService<IZSpecies>>();
    speciesService.get.mockImplementation(async (name) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(name).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await species.retrieve(request);
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
      expect(actual).toEqual(gardevoir$.name);
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
      expect(actual).toEqual(gallade$.name);
    });
  });
});

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import {
  ZDataRequestBuilder,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder,
  ZFilterBinaryBuilder
} from '@zthun/helpful-query';
import {
  IZPokemon,
  IZPokemonService,
  IZSpecies,
  IZSpeciesService,
  ZPokemonBuilder,
  ZSpeciesBuilder
} from '@zthun/pokedex';
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZPokemonServiceContext } from '../pokemon/pokemon-service';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZSpeciesListPage } from './species-list-page';
import { ZPokemonListPageComponentModel } from './species-list-page.cm';
import { ZSpeciesServiceContext } from './species-service';

describe('ZSpeciesListPage', () => {
  let speciesService: Mocked<IZSpeciesService>;
  let pokemonService: Mocked<IZPokemonService>;
  let bulbasaur: IZSpecies;
  let charmander: IZSpecies;
  let squirtle: IZSpecies;
  let pikachu: IZSpecies;
  let species: IZSpecies[];
  let history: MemoryHistory;

  async function createTestTarget() {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZTestRouter navigator={history} location={history.location}>
          <ZPokemonServiceContext.Provider value={pokemonService}>
            <ZSpeciesServiceContext.Provider value={speciesService}>
              <ZSpeciesListPage />
            </ZSpeciesServiceContext.Provider>
          </ZPokemonServiceContext.Provider>
        </ZTestRouter>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokemonListPageComponentModel);
    await (await target.grid()).load();
    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();

    bulbasaur = new ZSpeciesBuilder().bulbasaur().build();
    charmander = new ZSpeciesBuilder().charmander().build();
    squirtle = new ZSpeciesBuilder().squirtle().build();
    pikachu = new ZSpeciesBuilder().pikachu().build();
    species = [bulbasaur, charmander, squirtle, pikachu];

    const options = new ZDataSourceStaticOptionsBuilder<IZSpecies>().search(new ZDataSearchFields(['name'])).build();
    const source = new ZDataSourceStatic(species, options);
    const pokemon = new ZDataSourceStatic(
      [
        new ZPokemonBuilder().bulbasaur().build(),
        new ZPokemonBuilder().squirtle().build(),
        new ZPokemonBuilder().charmander().build(),
        new ZPokemonBuilder().pikachu().build()
      ],
      new ZDataSourceStaticOptionsBuilder<IZPokemon>().search(new ZDataSearchFields(['name'])).build()
    );

    speciesService = mock<IZSpeciesService>();
    speciesService.retrieve.mockImplementation((r) => source.retrieve(r));
    speciesService.count.mockImplementation((r) => source.count(r));
    speciesService.get.mockImplementation(async (s) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(s).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await source.retrieve(request);
      return result;
    });

    pokemonService = mock<IZPokemonService>();
    pokemonService.get.mockImplementation(async (n) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(n).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await pokemon.retrieve(request);
      return result;
    });
  });

  it('should render the list of species on the first page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.cards();
    // Assert.
    expect(actual.length).toEqual(species.length);
  });

  it('should render named cards by the species page list', async () => {
    // Arrange.
    const target = await createTestTarget();
    const expected = species.map((p) => p.name);
    expected.sort();
    // Act.
    const cards = await target.cards();
    const actual = await Promise.all(cards.map((c) => c.name()));
    actual.sort();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should render species types', async () => {
    // Arrange.
    const expected = new ZPokemonBuilder().charmander().build().types;
    const target = await createTestTarget();
    const card = await target.card(charmander.name);
    await card!.load();
    // Act
    const types = await card!.types();
    const badges = await Promise.all(types);
    const actual = await Promise.all(badges.map((b) => b.type()));
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should render the list of searched species', async () => {
    // Arrange.
    const target = await createTestTarget();
    const grid = await target.grid();
    const finder = await grid.search();
    // Act.
    await finder.keyboard(pikachu.name);
    const cards = await target.cards();
    const actual = await target.card(pikachu.name);
    // Assert.
    expect(cards.length).toEqual(1);
    expect(actual).toBeTruthy();
  });

  it('should navigate to the details page of a species when the card is clicked', async () => {
    // Arrange.
    const target = await createTestTarget();
    const card = await target.card(charmander.name);
    // Act.
    await card?.click();
    const actual = history.location.pathname;
    // Assert.
    expect(actual).toEqual(`/pokemon/${charmander.name}`);
  });
});

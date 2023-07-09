import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext, ZTestRouter } from '@zthun/fashion-boutique';
import { ZDataSearchFields, ZDataSourceStatic, ZDataSourceStaticOptionsBuilder } from '@zthun/helpful-query';
import { IZPokemon, IZPokemonService, ZPokemonBuilder } from '@zthun/pokedex';
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../../theme/pokemon-theme';
import { ZPokemonServiceContext } from '../pokemon-service';
import { ZPokedexListPage } from './pokemon-list-page';
import { ZPokedexListPageComponentModel } from './pokemon-list-page.cm';

describe('ZPokedexListPage', () => {
  let pokemonService: Mocked<IZPokemonService>;
  let bulbasaur: IZPokemon;
  let charmander: IZPokemon;
  let squirtle: IZPokemon;
  let pikachu: IZPokemon;
  let pokemon: IZPokemon[];
  let history: MemoryHistory;

  async function createTestTarget() {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZTestRouter navigator={history} location={history.location}>
          <ZPokemonServiceContext.Provider value={pokemonService}>
            <ZPokedexListPage />
          </ZPokemonServiceContext.Provider>
        </ZTestRouter>
      </ZFashionThemeContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(driver, ZPokedexListPageComponentModel);
    await (await target.grid()).load();
    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();

    bulbasaur = new ZPokemonBuilder().bulbasaur().build();
    charmander = new ZPokemonBuilder().charmander().build();
    squirtle = new ZPokemonBuilder().squirtle().build();
    pikachu = new ZPokemonBuilder().pikachu().build();
    pokemon = [bulbasaur, charmander, squirtle, pikachu];

    const options = new ZDataSourceStaticOptionsBuilder<IZPokemon>().search(new ZDataSearchFields(['name'])).build();
    const source = new ZDataSourceStatic(pokemon, options);

    pokemonService = mock<IZPokemonService>();
    pokemonService.retrieve.mockImplementation((r) => source.retrieve(r));
    pokemonService.count.mockImplementation((r) => source.count(r));
  });

  it('should render the list of pokemon on the first page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.cards();
    // Assert.
    expect(actual.length).toEqual(pokemon.length);
  });

  it('should render named cards by the pokemon page list', async () => {
    // Arrange.
    const target = await createTestTarget();
    const expected = pokemon.map((p) => p.name);
    expected.sort();
    // Act.
    const cards = await target.cards();
    const actual = await Promise.all(cards.map((c) => c.name()));
    actual.sort();
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should render pokemon types', async () => {
    // Arrange.
    const target = await createTestTarget();
    const card = await target.card(charmander.name);
    // Act
    const types = await card!.types();
    const badges = await Promise.all(types);
    const actual = await Promise.all(badges.map((b) => b.type()));
    // Assert
    expect(actual).toEqual(charmander.types);
  });

  it('should render the list of searched pokemon', async () => {
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

  it('should navigate to the details page of a pokemon when the card is clicked', async () => {
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

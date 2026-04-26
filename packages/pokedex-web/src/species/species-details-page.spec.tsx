import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZRoute, ZRouteMap, ZTestRouter } from "@zthun/fashion-boutique";
import type { IZEvolution, IZPokemon, IZSpecies } from "@zthun/pokedex";
import {
  ZEvolutionBuilder,
  ZPokemonBuilder,
  ZSpeciesBuilder,
} from "@zthun/pokedex";
import type { History } from "history";
import { createMemoryHistory } from "history";
import type { Mocked } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";

import { ZEvolutionServiceContext } from "../evolution/evolution-service.mjs";
import { ZPokemonServiceContext } from "../pokemon/pokemon-service.mjs";
import type { IZResourceService } from "../resource/resource-service.mjs";
import { ZSpeciesDetailsPageComponentModel } from "./species-details-page.cm.mjs";
import { ZSpeciesDetailsPage } from "./species-details-page.js";
import { ZSpeciesServiceContext } from "./species-service.mjs";

describe("ZSpeciesDetailsPage", () => {
  let history: History;
  let evolutionService: Mocked<IZResourceService<IZEvolution>>;
  let pokemonService: Mocked<IZResourceService<IZPokemon>>;
  let speciesService: Mocked<IZResourceService<IZSpecies>>;
  let charizard$: IZSpecies;
  let charizard: IZPokemon;

  const createTestTarget = async () => {
    const element = (
      <ZSpeciesServiceContext.Provider value={speciesService}>
        <ZPokemonServiceContext.Provider value={pokemonService}>
          <ZEvolutionServiceContext.Provider value={evolutionService}>
            <ZTestRouter navigator={history} location={history.location}>
              <ZRouteMap>
                <ZRoute
                  path="/pokemon/:name"
                  element={<ZSpeciesDetailsPage />}
                />
                <ZRoute path="/not-pokemon" element={<ZSpeciesDetailsPage />} />
              </ZRouteMap>
            </ZTestRouter>
          </ZEvolutionServiceContext.Provider>
        </ZPokemonServiceContext.Provider>
      </ZSpeciesServiceContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(
      driver,
      ZSpeciesDetailsPageComponentModel,
    );
    await target.load();
    return target;
  };

  beforeEach(() => {
    charizard$ = new ZSpeciesBuilder().charizard().build();
    charizard = new ZPokemonBuilder().charizard().build();
    history = createMemoryHistory({
      initialEntries: [`/pokemon/${charizard$.name}`],
    });

    evolutionService = mock<IZResourceService<IZEvolution>>();
    evolutionService.get.mockResolvedValue(
      new ZEvolutionBuilder().ralts().build(),
    );

    pokemonService = mock<IZResourceService<IZPokemon>>();
    pokemonService.get.mockResolvedValue(charizard);

    speciesService = mock<IZResourceService<IZSpecies>>();
    speciesService.get.mockResolvedValue(charizard$);
  });

  it("should render the correct species", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.species();
    // Assert.
    expect(actual).toEqual(charizard$.name);
  });

  describe("Error", () => {
    it("should render a NotFound if the species cannot be found", async () => {
      // Arrange.
      speciesService.get.mockRejectedValue(new Error("Game Over!"));
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should render NotFound if the name cannot be parsed from the path", async () => {
      // Arrange.
      history = createMemoryHistory({ initialEntries: [`/not-pokemon`] });
      const target = await createTestTarget();
      // Act.
      const actual = await target.notFound();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Varieties", () => {
    it("should render the varieties card", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.varieties();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Evolution", () => {
    it("should render the evolution chain of the pokemon", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.evolution();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Attributes", () => {
    it("should render the attributes of the pokemon", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.attributes();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should render the attributes card with the main pokemon if there are no varieties", async () => {
      // Arrange.
      const expected = new ZSpeciesBuilder().build();
      speciesService.get.mockResolvedValue(expected);
      const target = await createTestTarget();
      // Assert.
      const actual = await (await target.attributes()).pokemon();
      // Assert.
      expect(actual).toEqual(expected.main);
    });
  });

  describe("Stats", () => {
    it("should render the stats of the pokemon", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await target.stats();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should render the stats card with the main pokemon if there are no varieties", async () => {
      // Arrange.
      const expected = new ZSpeciesBuilder().build();
      speciesService.get.mockResolvedValue(expected);
      const target = await createTestTarget();
      // Assert.
      const actual = await (await target.stats()).pokemon();
      // Assert.
      expect(actual).toEqual(expected.main);
    });
  });
});

import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import type { IZEvolutionNode, IZSpecies } from "@zthun/pokedex";
import { ZEvolutionNodeBuilder, ZSpeciesBuilder } from "@zthun/pokedex";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { startCase } from "lodash-es";
import type { Mocked } from "vitest";
import { beforeEach, describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";

import type { IZResourceService } from "../resource/resource-service.mjs";
import { ZSpeciesServiceContext } from "../species/species-service.mjs";
import { ZEvolutionNodeBubbleComponentModel } from "./evolution-node-bubble.cm.mjs";
import { ZEvolutionNodeBubble } from "./evolution-node-bubble.js";

describe("ZEvolutionNodeBubble", () => {
  let node: IZEvolutionNode;
  let gardevoir$: IZSpecies;
  let history: MemoryHistory;

  let speciesService: Mocked<IZResourceService<IZSpecies>>;

  const createTestTarget = async () => {
    const element = (
      <ZSpeciesServiceContext value={speciesService}>
        <ZTestRouter navigator={history} location={history.location}>
          <ZEvolutionNodeBubble node={node} />
        </ZTestRouter>
      </ZSpeciesServiceContext>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    const target = await ZCircusBy.first(
      driver,
      ZEvolutionNodeBubbleComponentModel,
    );
    await target.load();
    return target;
  };

  beforeEach(() => {
    history = createMemoryHistory();

    node = new ZEvolutionNodeBuilder().gardevoir().build();

    gardevoir$ = new ZSpeciesBuilder().gardevoir().build();

    speciesService = mock<IZResourceService<IZSpecies>>();
    speciesService.get.mockResolvedValue(gardevoir$);
  });

  describe("Error", () => {
    it("should render the error pokemon name if the species fails to load.", async () => {
      // Arrange.
      speciesService.get.mockRejectedValue(new Error("Game Over"));
      const target = await createTestTarget();
      const expected = startCase(new ZSpeciesBuilder().build().name);

      // Act.
      const actual = await target.name();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Success", () => {
    it("should render the species name", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.name();

      // Assert.
      expect(actual).toEqual(startCase(gardevoir$.name));
    });

    it("click should navigate you to the selected species", async () => {
      // Arrange.
      const expected = `/pokemon/${gardevoir$.name}`;
      const target = await createTestTarget();
      const bubble = await target.bubble();

      // Act.
      await bubble.click();
      const actual = history.location.pathname;

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});

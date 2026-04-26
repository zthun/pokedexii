import { useAsyncState } from "@zthun/helpful-react";
import type { IZSpecies } from "@zthun/pokedex";
import { ZSpeciesBuilder } from "@zthun/pokedex";
import { ZHttpService } from "@zthun/webigail-http";
import { createContext, useContext } from "react";

import type { IZResourceService } from "../resource/resource-service.mjs";
import { ZResourceService } from "../resource/resource-service.mjs";

function createSpeciesService(): IZResourceService<IZSpecies> {
  return new ZResourceService<IZSpecies>(new ZHttpService(), "species");
}

export const ZSpeciesServiceContext = createContext(createSpeciesService());

export function useSpeciesService() {
  return useContext(ZSpeciesServiceContext);
}

export function useSpecies(name: string | null | undefined) {
  const service = useSpeciesService();
  return useAsyncState(
    () =>
      name ? service.get(name) : Promise.resolve(new ZSpeciesBuilder().build()),
    [name],
  );
}

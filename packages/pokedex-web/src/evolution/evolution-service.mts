import { useAsyncState } from "@zthun/helpful-react";
import type { IZEvolution } from "@zthun/pokedex";
import { ZHttpService } from "@zthun/webigail-http";
import { createContext, useContext } from "react";
import type { IZResourceService } from "../resource/resource-service.mjs";
import { ZResourceService } from "../resource/resource-service.mjs";

function createEvolutionService(): IZResourceService<IZEvolution> {
  return new ZResourceService<IZEvolution>(new ZHttpService(), "evolutions");
}

export const ZEvolutionServiceContext = createContext(createEvolutionService());

export function useEvolutionService() {
  return useContext(ZEvolutionServiceContext);
}

export function useEvolution(name: string) {
  const service = useEvolutionService();
  return useAsyncState(() => service.get(name), [name]);
}

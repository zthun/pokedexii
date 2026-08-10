import type { IZType } from "@zthun/pokedex";
import { ZHttpService } from "@zthun/webigail-http";
import { createContext, use } from "react";

import type { IZResourceService } from "../resource/resource-service.mjs";
import { ZResourceService } from "../resource/resource-service.mjs";

function createTypeService(): IZResourceService<IZType> {
  return new ZResourceService(new ZHttpService(), "types");
}

export const ZTypeServiceContext = createContext(createTypeService());

export function useTypeService() {
  return use(ZTypeServiceContext);
}

import { IZPokemonService, ZPokemonServiceHttp } from '@zthun/pokedex';
import { ZHttpService } from '@zthun/webigail-http';
import { createContext, useContext } from 'react';

export function createDefaultPokemonService(): IZPokemonService {
  return new ZPokemonServiceHttp(new ZHttpService());
}

export const ZPokemonServiceContext = createContext(createDefaultPokemonService());

export function usePokemonService() {
  return useContext(ZPokemonServiceContext);
}

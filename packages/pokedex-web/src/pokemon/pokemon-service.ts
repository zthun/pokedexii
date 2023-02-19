import { IZDataRequest, IZPokemonService, ZPokemonServiceHttp } from '@zthun/pokedex';
import { ZHttpService } from '@zthun/works.http';
import { createContext, useContext } from 'react';
import { useAsyncState } from '../state/use-async-state';

export function createDefaultPokemonService(): IZPokemonService {
  return new ZPokemonServiceHttp(new ZHttpService());
}

export const ZPokemonServiceContext = createContext(createDefaultPokemonService());

export function usePokemonService() {
  return useContext(ZPokemonServiceContext);
}

export function usePokemonPage(request: IZDataRequest) {
  const service = usePokemonService();
  return useAsyncState(() => service.list(request), [request]);
}

export function usePokemon(idOrName: number | string) {
  const service = usePokemonService();
  return useAsyncState(() => service.get(idOrName), [idOrName]);
}

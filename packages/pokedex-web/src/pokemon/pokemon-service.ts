import { IZDataRequest, IZPokemonService, ZPokemonServiceHttp } from '@zthun/pokedex';
import { ZHttpService } from '@zthun/works.http';
import { createContext, useContext } from 'react';
import { useAsyncState } from '../state/use-async-state';

export const createDefaultPokemonService: () => IZPokemonService = () => new ZPokemonServiceHttp(new ZHttpService());
export const ZPokemonServiceContext = createContext(createDefaultPokemonService());
export const usePokemonService = () => useContext(ZPokemonServiceContext);

export function usePokemonPage(request: IZDataRequest) {
  const service = usePokemonService();
  return useAsyncState(() => service.list(request), [request]);
}

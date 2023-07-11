import { useAsyncState } from '@zthun/helpful-react';
import { ZSpeciesBuilder, createSpeciesService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZSpeciesServiceContext = createContext(createSpeciesService());

export function useSpeciesService() {
  return useContext(ZSpeciesServiceContext);
}

export function useSpecies(name: string | null | undefined) {
  const service = useSpeciesService();
  return useAsyncState(() => (name ? service.get(name) : Promise.resolve(new ZSpeciesBuilder().build())), [name]);
}

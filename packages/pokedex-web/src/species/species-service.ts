import { useAsyncState } from '@zthun/helpful-react';
import { createSpeciesService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZSpeciesServiceContext = createContext(createSpeciesService());

export function useSpeciesService() {
  return useContext(ZSpeciesServiceContext);
}

export function useSpecies(name: string) {
  const service = useSpeciesService();
  return useAsyncState(() => service.get(name), [name]);
}

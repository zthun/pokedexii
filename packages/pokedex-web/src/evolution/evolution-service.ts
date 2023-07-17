import { useAsyncState } from '@zthun/helpful-react';
import { createEvolutionService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZEvolutionServiceContext = createContext(createEvolutionService());

export function useEvolutionService() {
  return useContext(ZEvolutionServiceContext);
}

export function useEvolution(name: string) {
  const service = useEvolutionService();
  return useAsyncState(() => service.get(name), [name]);
}

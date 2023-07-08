import { createPokemonService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZPokemonServiceContext = createContext(createPokemonService());

export function usePokemonService() {
  return useContext(ZPokemonServiceContext);
}

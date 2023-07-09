import { useAsyncState } from '@zthun/helpful-react';
import { ZPokemonBuilder, createPokemonService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZPokemonServiceContext = createContext(createPokemonService());

export function usePokemonService() {
  return useContext(ZPokemonServiceContext);
}

export function usePokemon(name: string | null | undefined) {
  const service = usePokemonService();
  return useAsyncState(() => (name ? service.get(name) : Promise.resolve(new ZPokemonBuilder().build())), [name]);
}

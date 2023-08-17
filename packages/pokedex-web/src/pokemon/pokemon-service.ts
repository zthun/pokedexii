import { useAsyncState } from '@zthun/helpful-react';
import { IZPokemon, IZResourceService, ZPokemonBuilder } from '@zthun/pokedex';
import { ZHttpService } from '@zthun/webigail-http';
import { createContext, useContext } from 'react';
import { ZResourceService } from '../resource/resource-service';

function createPokemonService(): IZResourceService<IZPokemon> {
  return new ZResourceService<IZPokemon>(new ZHttpService(), 'pokemon');
}
export const ZPokemonServiceContext = createContext(createPokemonService());

export function usePokemonService() {
  return useContext(ZPokemonServiceContext);
}

export function usePokemon(name: string | null | undefined) {
  const service = usePokemonService();
  return useAsyncState(() => (name ? service.get(name) : Promise.resolve(new ZPokemonBuilder().build())), [name]);
}

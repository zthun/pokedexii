import { useAsyncState } from '@zthun/helpful-react';
import { ZType, createTypeService } from '@zthun/pokedex';
import { createContext, useContext } from 'react';

export const ZTypeServiceContext = createContext(createTypeService());

export function useTypeService() {
  return useContext(ZTypeServiceContext);
}

export function useType(name: ZType) {
  const service = useTypeService();
  return useAsyncState(() => service.get(name), [name]);
}

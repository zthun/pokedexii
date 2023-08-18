import { useAsyncState } from '@zthun/helpful-react';
import { IZType, ZType } from '@zthun/pokedex';
import { ZHttpService } from '@zthun/webigail-http';
import { createContext, useContext } from 'react';
import { IZResourceService, ZResourceService } from '../resource/resource-service';

function createTypeService(): IZResourceService<IZType> {
  return new ZResourceService(new ZHttpService(), 'types');
}

export const ZTypeServiceContext = createContext(createTypeService());

export function useTypeService() {
  return useContext(ZTypeServiceContext);
}

export function useType(name: ZType) {
  const service = useTypeService();
  return useAsyncState(() => service.get(name), [name]);
}

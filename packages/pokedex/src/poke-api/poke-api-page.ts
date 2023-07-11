import { IPokeApiNamedResource, createResource } from './poke-api-resource';

export interface IPokeApiPage {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: IPokeApiNamedResource[];
}

export function createApiPage<N extends string, I extends number, T extends { name: N; id: I }>(
  resource: string,
  resources: T[]
): IPokeApiPage {
  return {
    count: resources.length,
    next: null,
    previous: null,
    results: resources.map((r) => createResource(resource, r.id, r.name))
  };
}

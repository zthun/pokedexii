/**
 * Represents a resource that has a name.
 *
 * Every resource in the pokemon world has a name and this
 * serves as an id to the given resource.
 */
export interface IZResource<N extends string = string, I extends number = number> {
  id: I;
  name: N;
}

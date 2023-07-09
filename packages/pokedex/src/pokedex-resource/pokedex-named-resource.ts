/**
 * Represents a resource that has a name.
 *
 * Every resource in the pokemon world has a name and this
 * serves as an id to the given resource.
 */
export interface IZPokedexNamedResource<TName extends string = string> {
  name: TName;
}

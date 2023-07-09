export interface IPokeApiConverter<P, T> {
  convert(resource: P): Promise<T>;
}

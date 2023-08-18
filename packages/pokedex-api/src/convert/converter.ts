export interface IZConverter<TFrom, TTo> {
  convert(from: TFrom): Promise<TTo>;
}

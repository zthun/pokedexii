import { IZConverter } from './converter';

export class ZConverterList<TFrom, TTo> implements IZConverter<TFrom[], TTo[]> {
  public constructor(private _converter: IZConverter<TFrom, TTo>) {}

  public convert(from: TFrom[]): Promise<TTo[]> {
    return Promise.all(from.map((f) => this._converter.convert(f)));
  }
}

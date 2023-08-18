import { IZFilter, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZConverter } from './converter';

export class ZConverterIdOrNameSearch implements IZConverter<string | undefined | null, IZFilter | undefined> {
  public constructor(
    private readonly _subjectId = 'id',
    private readonly _subjectName = 'name'
  ) {}

  convert(search: string): Promise<IZFilter | undefined> {
    if (!search) {
      return Promise.resolve(undefined);
    }

    const idFilter = new ZFilterBinaryBuilder().subject(this._subjectId).equal().value(+search).build();
    const nameFilter = new ZFilterBinaryBuilder().subject(this._subjectName).like().value(`.*${search}.*`).build();
    return Promise.resolve(new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build());
  }
}

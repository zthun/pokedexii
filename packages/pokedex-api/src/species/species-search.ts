import { Injectable } from '@nestjs/common';
import { IZFilter, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZConverter } from '../convert/converter';

@Injectable()
export class ZSpeciesSearch implements IZConverter<string | undefined, IZFilter | undefined> {
  public convert(search: string | undefined): Promise<IZFilter | undefined> {
    if (!search) {
      return Promise.resolve(undefined);
    }

    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+search).build();

    // Note that the names of pokemon use kebab case for now.  It's better to search the language
    // field, but it needs support in dalmart.
    const nameFilter = new ZFilterBinaryBuilder().subject('names.name').like().value(`.*${search}.*`).build();

    // Types need to be typed exactly as to not confuse when searching for pokemon
    // that have part of a type as a substring.
    const typeFilter = new ZFilterBinaryBuilder().subject('pokemon.types.type.name').like().value(search).build();

    return Promise.resolve(
      new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).clause(typeFilter).build()
    );
  }
}

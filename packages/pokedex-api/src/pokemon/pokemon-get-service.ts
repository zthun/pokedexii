import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZPokemon } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceGetService } from '../resource/resource-service';
import { ZConvertToken } from '../resource/resource-tokens';
import { IPokeApiPokemon } from './pokemon';

@Injectable()
export class ZPokemonGetService implements IZResourceGetService<IZPokemon> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private readonly _converter: IZConverter<IPokeApiPokemon[], IZPokemon[]>
  ) {}

  public async get(identification: string | number): Promise<IZPokemon> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(identification).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+identification).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [pokemon] = await this._dal.read<IPokeApiPokemon>(ZPokedexCollection.Pokemon, request);

    if (pokemon == null) {
      throw new NotFoundException(`Pokemon, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([pokemon]);
    return result;
  }
}

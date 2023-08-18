import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZEvolution } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceGetService } from '../resource/resource-service';
import { ZConvertToken } from '../resource/resource-tokens';
import { IPokeApiEvolutionChain } from './poke-api-evolution-chain';

@Injectable()
export class ZEvolutionsGetService implements IZResourceGetService<IZEvolution> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private readonly _converter: IZConverter<IPokeApiEvolutionChain[], IZEvolution[]>
  ) {}

  public async get(identification: string | number): Promise<IZEvolution> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(identification).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+identification).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [pokemon] = await this._dal.read<IPokeApiEvolutionChain>(ZPokedexCollection.EvolutionChain, request);

    if (pokemon == null) {
      throw new NotFoundException(`Evolution, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([pokemon]);
    return result;
  }
}

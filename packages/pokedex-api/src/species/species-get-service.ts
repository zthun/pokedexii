import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IZResourceGetService } from '../resource/resource-service';
import { ZConvertToken } from '../resource/resource-tokens';
import { IPokeApiSpecies } from './species';

@Injectable()
export class ZSpeciesGetService implements IZResourceGetService<IZSpecies> {
  public constructor(
    @Inject(ZDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZConvertToken) private _converter: IZConverter<IPokeApiSpecies[], IZSpecies[]>
  ) {}

  public async get(identification: string | number): Promise<IZSpecies> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(identification).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+identification).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [species] = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, request);

    if (species == null) {
      throw new NotFoundException(`Species, ${identification}, was not found.`);
    }

    const [result] = await this._converter.convert([species]);
    return result;
  }
}

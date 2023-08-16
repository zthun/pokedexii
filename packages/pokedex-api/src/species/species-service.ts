import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZSpecies } from '@zthun/pokedex';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiSpecies, ZPokeApiSpeciesHelper } from './species';

export const ZPokedexSpeciesServiceToken = Symbol();

export interface IZPokedexSpeciesService {
  list(): Promise<IZSpecies[]>;
  get(name: string): Promise<IZSpecies>;
}

@Injectable()
export class ZPokedexSpeciesService {
  public constructor(@Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument) {}

  public async list(): Promise<IZSpecies[]> {
    const convert = new ZPokeApiSpeciesHelper();
    const request = new ZDataRequestBuilder().build();
    const _species = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, request);
    return _species.map(convert.to.bind(convert));
  }

  public async get(idOrName: string | number): Promise<IZSpecies> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(idOrName).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+idOrName).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [_species] = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, request);

    if (_species == null) {
      throw new NotFoundException(`Species, ${idOrName}, was not found.`);
    }

    return new ZPokeApiSpeciesHelper().to(_species);
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder, ZFilterBinaryBuilder, ZFilterLogicBuilder } from '@zthun/helpful-query';
import { IZSpecies, ZSpeciesBuilder } from '@zthun/pokedex';
import { findId } from 'src/resource/resource';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiSpecies } from './species';

export const ZPokedexSpeciesServiceToken = Symbol();

export interface IZPokedexSpeciesService {
  list(): Promise<IZSpecies[]>;
  get(name: string): Promise<IZSpecies>;
}

@Injectable()
export class ZPokedexSpeciesService {
  public constructor(@Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument) {}

  private convert(apiSpecies: IPokeApiSpecies): IZSpecies {
    const evolution = findId(apiSpecies.evolution_chain);

    let species = new ZSpeciesBuilder()
      .happiness(apiSpecies.base_happiness)
      .id(apiSpecies.id)
      .capture(apiSpecies.capture_rate)
      .name(apiSpecies.name)
      .evolution(evolution);

    apiSpecies.varieties.forEach((v) => {
      species = species.variety(v.pokemon.name!, v.is_default);
    });

    return species.build();
  }

  public async list(): Promise<IZSpecies[]> {
    const request = new ZDataRequestBuilder().build();
    const _species = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, request);
    return _species.map(this.convert.bind(this));
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

    return this.convert(_species);
  }
}

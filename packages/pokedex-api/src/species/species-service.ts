import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { IZSpecies, ZSpeciesBuilder } from '@zthun/pokedex';
import { findId } from 'src/resource/resource';
import { IZPokedexResourceService, ZPokedexResourceServiceToken } from 'src/resource/resource-service';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiSpecies } from './species';

export const ZPokedexSpeciesServiceToken = Symbol();

export interface IZPokedexSpeciesService {
  list(): Promise<IZSpecies[]>;
}

@Injectable()
export class ZPokedexSpeciesService {
  public constructor(
    @Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument,
    @Inject(ZPokedexResourceServiceToken) private _resource: IZPokedexResourceService
  ) {}

  public async list(): Promise<IZSpecies[]> {
    await this._resource.populate(ZPokedexCollection.Species);
    const request = new ZDataRequestBuilder().build();
    const _species = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.Species, request);

    return _species.map((s) => {
      const evolution = findId(s.evolution_chain);

      let species = new ZSpeciesBuilder()
        .happiness(s.base_happiness)
        .id(s.id)
        .capture(s.capture_rate)
        .name(s.name)
        .evolution(evolution);

      s.varieties.forEach((v) => {
        species = species.variety(v.pokemon.name!, v.is_default);
      });

      return species.build();
    });
  }
}

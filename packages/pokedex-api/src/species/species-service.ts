import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { firstDefined } from '@zthun/helpful-fn';
import {
  IZDataRequest,
  IZFilter,
  IZPage,
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZFilterCollectionBuilder,
  ZFilterLogicBuilder,
  ZPageBuilder
} from '@zthun/helpful-query';
import { IZSpecies, ZSpeciesBuilder, ZType } from '@zthun/pokedex';
import { keyBy } from 'lodash';
import { ZPokedexCollection, ZPokedexDatabaseToken } from '../database/pokedex-database';
import { IPokeApiPokemon } from '../pokemon/pokemon';
import { ZPokeApiResource } from '../resource/resource';
import { IPokeApiSpecies } from './species';

export const ZPokedexSpeciesServiceToken = Symbol();

export interface IZPokedexSpeciesService {
  list(request: IZDataRequest): Promise<IZPage<IZSpecies>>;
  get(name: string): Promise<IZSpecies>;
}

@Injectable()
export class ZPokedexSpeciesService {
  private readonly logger = new Logger(ZPokedexSpeciesService.name);

  public constructor(@Inject(ZPokedexDatabaseToken) private _dal: IZDatabaseDocument) {}

  private async _convert(species: IPokeApiSpecies[]): Promise<IZSpecies[]> {
    const convert = (s: IPokeApiSpecies): IZSpecies => {
      const evolution = ZPokeApiResource.findId(s.evolution_chain);

      let builder = new ZSpeciesBuilder()
        .happiness(s.base_happiness)
        .id(s.id)
        .capture(s.capture_rate)
        .name(s.name)
        .evolution(evolution);

      s.varieties.forEach((v) => {
        builder = builder.variety(v.pokemon.name!, v.is_default);
      });

      return builder.build();
    };

    const all = species.map(convert);
    const mains = all.map((s) => s.main);
    const filter = new ZFilterCollectionBuilder().subject('name').in().values(mains).build();
    const pokemon = await this._dal.read<IPokeApiPokemon>(
      ZPokedexCollection.Pokemon,
      new ZDataRequestBuilder().filter(filter).build()
    );
    const lookup = keyBy(pokemon, (p) => p.name);

    return all.map((s) => {
      const p = lookup[s.main];
      const official = p.sprites?.other['official-artwork'];
      const artwork = firstDefined(
        '',
        official?.front_default,
        official?.front_female,
        official?.front_shiny,
        official?.front_shiny_female
      );
      const types = p.types.map((t) => t.type.name as ZType);
      return new ZSpeciesBuilder().copy(s).artwork(artwork).types(types).build();
    });
  }

  public convertSearchToFilter(request: IZDataRequest): IZFilter | undefined {
    const { search } = request;

    if (search == null) {
      return undefined;
    }

    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+search).build();
    const nameFilter = new ZFilterBinaryBuilder().subject('name').like().value(`.*${search}.*`).build();
    return new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
  }

  public async list(request: IZDataRequest): Promise<IZPage<IZSpecies>> {
    this.logger.debug(`Retrieving species list`);
    const req = new ZDataRequestBuilder().copy(request).filter(this.convertSearchToFilter(request)).build();
    const count = await this._dal.count(ZPokedexCollection.PokemonSpecies, req.filter);
    const species = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, req);
    this.logger.debug(`Retrieved ${species.length} species`);
    const data = await this._convert(species);
    return new ZPageBuilder<IZSpecies>().data(data).count(count).build();
  }

  public async get(idOrName: string | number): Promise<IZSpecies> {
    const nameFilter = new ZFilterBinaryBuilder().subject('name').equal().value(idOrName).build();
    const idFilter = new ZFilterBinaryBuilder().subject('id').equal().value(+idOrName).build();
    const filter = new ZFilterLogicBuilder().or().clause(idFilter).clause(nameFilter).build();
    const request = new ZDataRequestBuilder().filter(filter).build();

    const [species] = await this._dal.read<IPokeApiSpecies>(ZPokedexCollection.PokemonSpecies, request);

    if (species == null) {
      throw new NotFoundException(`Species, ${idOrName}, was not found.`);
    }

    const [result] = await this._convert([species]);
    return result;
  }
}

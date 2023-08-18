import { Inject, Injectable } from '@nestjs/common';
import { IZDatabaseDocument } from '@zthun/dalmart-db';
import { firstDefined } from '@zthun/helpful-fn';
import { ZDataRequestBuilder, ZFilterCollectionBuilder } from '@zthun/helpful-query';
import { IZSpecies, ZSpeciesBuilder, ZType } from '@zthun/pokedex';
import { keyBy } from 'lodash';
import { IZConverter } from '../convert/converter';
import { ZDatabaseToken, ZPokedexCollection } from '../database/pokedex-database';
import { IPokeApiPokemon } from '../pokemon/pokemon';
import { ZPokeApiResource } from '../resource/resource';
import { IPokeApiSpecies } from './species';

@Injectable()
export class ZSpeciesConverter implements IZConverter<IPokeApiSpecies[], IZSpecies[]> {
  public constructor(@Inject(ZDatabaseToken) private _dal: IZDatabaseDocument) {}

  private single(s: IPokeApiSpecies): IZSpecies {
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
  }

  public async convert(species: IPokeApiSpecies[]): Promise<IZSpecies[]> {
    const all = species.map(this.single.bind(this));
    const mains = all.map((s) => s.main);

    const filter = new ZFilterCollectionBuilder().subject('name').in().values(mains).build();
    const request = new ZDataRequestBuilder().filter(filter).build();
    const pokemon = await this._dal.read<IPokeApiPokemon>(ZPokedexCollection.Pokemon, request);
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
}

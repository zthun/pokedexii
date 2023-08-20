import { Injectable } from '@nestjs/common';
import { firstDefined } from '@zthun/helpful-fn';
import { IZSpecies, ZSpeciesBuilder, ZType } from '@zthun/pokedex';
import { first } from 'lodash';
import { IZConverter } from '../convert/converter';
import { ZPokeApiResource } from '../resource/resource';
import { IPokeApiSpecies } from './species';

@Injectable()
export class ZSpeciesConverter implements IZConverter<IPokeApiSpecies, IZSpecies> {
  public async convert(species: IPokeApiSpecies): Promise<IZSpecies> {
    const evolution = ZPokeApiResource.findId(species.evolution_chain);

    let builder = new ZSpeciesBuilder()
      .happiness(species.base_happiness)
      .id(species.id)
      .capture(species.capture_rate)
      .name(species.name)
      .evolution(evolution);

    species.varieties.forEach((v) => {
      builder = builder.variety(v.pokemon.name!, v.is_default);
    });

    // The main is required and expected.
    const [main] = species.varieties.filter((p) => p.is_default)!;
    const pokemon = first(species.pokemon?.filter((p) => p.name === main.pokemon.name))!;

    const official = pokemon?.sprites?.other['official-artwork'];
    const artwork = firstDefined(
      '',
      official?.front_default,
      official?.front_female,
      official?.front_shiny,
      official?.front_shiny_female
    );
    const types = pokemon?.types.map((t) => t.type.name as ZType);
    return builder.artwork(artwork).types(types).build();
  }
}

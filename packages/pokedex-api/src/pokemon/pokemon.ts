import { IZPokemon, ZPokemonBuilder } from '@zthun/pokedex';
import { ZPokedexCollection } from 'src/database/pokedex-database';
import { IPokeApiResource, ZPokeApiResource } from '../resource/resource';

interface IPokeApiPokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: IPokeApiResource;
}

interface IPokeApiPokemonGameIndex {
  game_index: number;
  version: IPokeApiResource;
}

interface IPokeApiPokemonHeldItemVersionDetails {
  rarity: number;
  version: IPokeApiResource;
}

interface IPokeApiPokemonHeldItem {
  version_details: IPokeApiPokemonHeldItemVersionDetails[];
  item: IPokeApiResource;
}

interface IPokeApiPokemonMovesVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: IPokeApiResource;
}

interface IPokeApiPokemonMoves {
  version_group_details: IPokeApiPokemonMovesVersionGroupDetails[];
  move: IPokeApiResource;
}

interface IPokeApiPokemonSpriteFrames {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

interface IPokeApiPokemonSprites extends IPokeApiPokemonSpriteFrames {
  other: {
    'dream_world'?: IPokeApiPokemonSpriteFrames;
    'home'?: IPokeApiPokemonSpriteFrames;
    'official-artwork'?: IPokeApiPokemonSpriteFrames;
  };
  // TODO:  The version stuff here is nuts.  I'm leaving that off for the time being.
}

interface IPokeApiPokemonStats {
  base_stat: number;
  effort: number;
  stat: IPokeApiResource;
}

interface IPokeApiPokemonTypes {
  slot: number;
  type: IPokeApiResource;
}

export interface IPokeApiPokemon {
  abilities: IPokeApiPokemonAbility[];
  base_experience: number;
  forms: IPokeApiResource[];
  game_indices: IPokeApiPokemonGameIndex[];
  height: number;
  held_items: IPokeApiPokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IPokeApiPokemonMoves[];
  name: string;
  order: number;
  species: IPokeApiResource;
  sprites: IPokeApiPokemonSprites;
  stats: IPokeApiPokemonStats[];
  types: IPokeApiPokemonTypes[];
  weight: number;
}

export class ZPokeApiPokemonBuilder {
  private _pokemon: IPokeApiPokemon;

  public constructor() {
    this.from(new ZPokemonBuilder().build());
  }

  public from(other: IZPokemon) {
    this._pokemon = {
      abilities: other.abilities.map((a, i) => ({
        ability: ZPokeApiResource.toResource(ZPokedexCollection.Pokemon, a.name, a.name),
        is_hidden: a.hidden,
        slot: i
      })),
      base_experience: 1,
      forms: [],
      game_indices: [],
      height: other.height,
      held_items: [],
      id: other.id,
      is_default: true,
      location_area_encounters: '',
      moves: [],
      name: other.name,
      order: 1,
      species: ZPokeApiResource.toResource(ZPokedexCollection.PokemonSpecies, other.name),
      sprites: {
        other: {
          'official-artwork': {
            front_default: other.artwork
          }
        }
      },
      stats: [
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'hp'),
          base_stat: other.stats.hp.base,
          effort: other.stats.hp.effort
        },
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'attack'),
          base_stat: other.stats.attack.base,
          effort: other.stats.attack.effort
        },
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'defense'),
          base_stat: other.stats.defense.base,
          effort: other.stats.defense.effort
        },
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'special-attack'),
          base_stat: other.stats.specialAttack.base,
          effort: other.stats.specialAttack.effort
        },
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'special-defense'),
          base_stat: other.stats.specialDefense.base,
          effort: other.stats.specialDefense.effort
        },
        {
          stat: ZPokeApiResource.toResource(ZPokedexCollection.Stat, 'speed'),
          base_stat: other.stats.speed.base,
          effort: other.stats.speed.effort
        }
      ],
      types: (other.types || []).map((t, i) => ({
        slot: i,
        type: ZPokeApiResource.toResource(ZPokedexCollection.Type, t)
      })),
      weight: other.weight
    };
    return this;
  }

  public build() {
    return { ...this._pokemon };
  }
}

import { IPokeApiResource } from './poke-api-resource';

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

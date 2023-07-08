import { IZFashion } from '@zthun/fashion-theme';
import { ZPokemonType } from '@zthun/pokedex';
import {
  createAttackStatFashion,
  createDefenseStatFashion,
  createHpStatFashion,
  createSpecialAttackStatFashion,
  createSpecialDefenseStatFashion,
  createSpeedStatFashion
} from './pokemon-theme-custom-stats';
import {
  createBugTypeFashion,
  createDarkTypeFashion,
  createDragonTypeFashion,
  createElectricTypeFashion,
  createFairyTypeFashion,
  createFightingTypeFashion,
  createFireTypeFashion,
  createFlyingTypeFashion,
  createGhostTypeFashion,
  createGrassTypeFashion,
  createGroundTypeFashion,
  createIceTypeFashion,
  createNormalTypeFashion,
  createPoisonTypeFashion,
  createPsychicTypeFashion,
  createRockTypeFashion,
  createShadowTypeFashion,
  createSteelTypeFashion,
  createUnknownTypeFashion,
  createWaterTypeFashion
} from './pokemon-theme-custom-types';

export interface IZPokemonThemeCustom {
  stats: {
    hp: IZFashion;
    attack: IZFashion;
    defense: IZFashion;
    specialAttack: IZFashion;
    specialDefense: IZFashion;
    speed: IZFashion;
  };
  types: Record<ZPokemonType, IZFashion>;
}

export function createPokemonThemeCustom(): IZPokemonThemeCustom {
  return {
    stats: {
      hp: createHpStatFashion(),
      attack: createAttackStatFashion(),
      defense: createDefenseStatFashion(),
      specialAttack: createSpecialAttackStatFashion(),
      specialDefense: createSpecialDefenseStatFashion(),
      speed: createSpeedStatFashion()
    },
    types: {
      [ZPokemonType.Unknown]: createUnknownTypeFashion(),
      [ZPokemonType.Normal]: createNormalTypeFashion(),
      [ZPokemonType.Fighting]: createFightingTypeFashion(),
      [ZPokemonType.Flying]: createFlyingTypeFashion(),
      [ZPokemonType.Poison]: createPoisonTypeFashion(),
      [ZPokemonType.Ground]: createGroundTypeFashion(),
      [ZPokemonType.Rock]: createRockTypeFashion(),
      [ZPokemonType.Bug]: createBugTypeFashion(),
      [ZPokemonType.Ghost]: createGhostTypeFashion(),
      [ZPokemonType.Steel]: createSteelTypeFashion(),
      [ZPokemonType.Fire]: createFireTypeFashion(),
      [ZPokemonType.Water]: createWaterTypeFashion(),
      [ZPokemonType.Grass]: createGrassTypeFashion(),
      [ZPokemonType.Electric]: createElectricTypeFashion(),
      [ZPokemonType.Psychic]: createPsychicTypeFashion(),
      [ZPokemonType.Ice]: createIceTypeFashion(),
      [ZPokemonType.Dragon]: createDragonTypeFashion(),
      [ZPokemonType.Dark]: createDarkTypeFashion(),
      [ZPokemonType.Fairy]: createFairyTypeFashion(),
      [ZPokemonType.Shadow]: createShadowTypeFashion()
    }
  };
}

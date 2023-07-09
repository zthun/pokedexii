import { IZFashion } from '@zthun/fashion-theme';
import { ZType } from '@zthun/pokedex';
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
  types: Record<ZType, IZFashion>;
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
      [ZType.Unknown]: createUnknownTypeFashion(),
      [ZType.Normal]: createNormalTypeFashion(),
      [ZType.Fighting]: createFightingTypeFashion(),
      [ZType.Flying]: createFlyingTypeFashion(),
      [ZType.Poison]: createPoisonTypeFashion(),
      [ZType.Ground]: createGroundTypeFashion(),
      [ZType.Rock]: createRockTypeFashion(),
      [ZType.Bug]: createBugTypeFashion(),
      [ZType.Ghost]: createGhostTypeFashion(),
      [ZType.Steel]: createSteelTypeFashion(),
      [ZType.Fire]: createFireTypeFashion(),
      [ZType.Water]: createWaterTypeFashion(),
      [ZType.Grass]: createGrassTypeFashion(),
      [ZType.Electric]: createElectricTypeFashion(),
      [ZType.Psychic]: createPsychicTypeFashion(),
      [ZType.Ice]: createIceTypeFashion(),
      [ZType.Dragon]: createDragonTypeFashion(),
      [ZType.Dark]: createDarkTypeFashion(),
      [ZType.Fairy]: createFairyTypeFashion(),
      [ZType.Shadow]: createShadowTypeFashion()
    }
  };
}

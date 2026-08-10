import type { IZFashion } from "@zthun/fashion-theme";
import { ZType } from "@zthun/pokedex";
import { createContext, use } from "react";

import { createEvolutionFashion } from "./pokemon-theme-evolution.mjs";
import type { IZPokemonThemeStats } from "./pokemon-theme-stats.mjs";
import {
  createAttackStatFashion,
  createDefenseStatFashion,
  createHpStatFashion,
  createSpecialAttackStatFashion,
  createSpecialDefenseStatFashion,
  createSpeedStatFashion,
} from "./pokemon-theme-stats.mjs";
import type { IZPokemonThemeTypes } from "./pokemon-theme-types.mjs";
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
  createWaterTypeFashion,
} from "./pokemon-theme-types.mjs";

export interface IZPokemonTheme {
  stats: IZPokemonThemeStats;
  types: IZPokemonThemeTypes;
  evolution: IZFashion;
}

export function createPokemonTheme(): IZPokemonTheme {
  return {
    stats: {
      hp: createHpStatFashion(),
      attack: createAttackStatFashion(),
      defense: createDefenseStatFashion(),
      specialAttack: createSpecialAttackStatFashion(),
      specialDefense: createSpecialDefenseStatFashion(),
      speed: createSpeedStatFashion(),
    },
    types: {
      [ZType.Bug]: createBugTypeFashion(),
      [ZType.Dark]: createDarkTypeFashion(),
      [ZType.Dragon]: createDragonTypeFashion(),
      [ZType.Electric]: createElectricTypeFashion(),
      [ZType.Fairy]: createFairyTypeFashion(),
      [ZType.Fighting]: createFightingTypeFashion(),
      [ZType.Fire]: createFireTypeFashion(),
      [ZType.Flying]: createFlyingTypeFashion(),
      [ZType.Ghost]: createGhostTypeFashion(),
      [ZType.Grass]: createGrassTypeFashion(),
      [ZType.Ground]: createGroundTypeFashion(),
      [ZType.Ice]: createIceTypeFashion(),
      [ZType.Normal]: createNormalTypeFashion(),
      [ZType.Poison]: createPoisonTypeFashion(),
      [ZType.Psychic]: createPsychicTypeFashion(),
      [ZType.Rock]: createRockTypeFashion(),
      [ZType.Shadow]: createShadowTypeFashion(),
      [ZType.Steel]: createSteelTypeFashion(),
      [ZType.Unknown]: createUnknownTypeFashion(),
      [ZType.Water]: createWaterTypeFashion(),
      [ZType.Stellar]: createUnknownTypeFashion(),
    },
    evolution: createEvolutionFashion(),
  };
}

export const ZPokemonThemeContext = createContext(createPokemonTheme());

export const usePokemonTheme = () => use(ZPokemonThemeContext);

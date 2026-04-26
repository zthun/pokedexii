import type { IZFashion } from "@zthun/fashion-theme";
import {
  black,
  white,
  ZFashionBuilder,
  ZFashionStateBuilder,
} from "@zthun/fashion-theme";
import type { ZType } from "@zthun/pokedex";

export interface IZPokemonThemeTypes extends Record<ZType, IZFashion> {}

export function createBugTypeFashion() {
  return new ZFashionBuilder()
    .name("Bug")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(169 201 84) 0%, rgb(91 141 44) 100%)",
        )
        .contrast(white())
        .border("#e0f97a")
        .build(),
    )
    .build();
}

export function createDarkTypeFashion() {
  return new ZFashionBuilder()
    .name("Dark")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(45,40,47,1) 0%, rgba(64,60,67,1) 100%)",
        )
        .border("#555257")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createDragonTypeFashion() {
  return new ZFashionBuilder()
    .name("Dragon")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(68,179,228,1) 25%, rgba(244,90,159,1) 80%)",
        )
        .border("#1d63f1")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createElectricTypeFashion() {
  return new ZFashionBuilder()
    .name("Electric")
    .idle(
      new ZFashionStateBuilder()
        .main("linear-gradient(180deg, rgb(255 200 1) 0%, rgb(169 124 2) 100%)")
        .border("#e9bc00")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createFairyTypeFashion() {
  return new ZFashionBuilder()
    .name("Fairy")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(248 190 219) 0%, rgb(193 82 147) 100%)",
        )
        .border("#feb1e1")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createFightingTypeFashion() {
  return new ZFashionBuilder()
    .name("Fighting")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(197,56,1,1) 0%, rgba(127,40,6,1) 100%)",
        )
        .border("#d95b01")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createFireTypeFashion() {
  return new ZFashionBuilder()
    .name("Fire")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(233,134,13,1) 0%, rgba(208,66,1,1) 100%)",
        )
        .border("#d26201")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createFlyingTypeFashion() {
  return new ZFashionBuilder()
    .name("Flying")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(124,247,253,1) 0%, rgba(8,144,226,1) 100%)",
        )
        .border("#44b3e4")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createGhostTypeFashion() {
  return new ZFashionBuilder()
    .name("Ghost")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(75,45,90,1) 0%, rgba(103,47,133,1) 100%)",
        )
        .border("#9a5cb3")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createGrassTypeFashion() {
  return new ZFashionBuilder()
    .name("Grass")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(145,239,13,1) 0%, rgba(11,167,75,1) 100%)",
        )
        .border("#07b94c")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createGroundTypeFashion() {
  return new ZFashionBuilder()
    .name("Ground")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(213 163 18) 0%, rgb(120 71 17) 100%)",
        )
        .border("#a98e40")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createIceTypeFashion() {
  return new ZFashionBuilder()
    .name("Ice")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(106 232 232) 0%, rgb(0 164 168) 100%)",
        )
        .border("#97e0ff")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createNormalTypeFashion() {
  return new ZFashionBuilder()
    .name("Normal")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(167 162 152) 0%, rgb(118 109 94) 100%)",
        )
        .border("#dad4c8")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createPoisonTypeFashion() {
  return new ZFashionBuilder()
    .name("Poison")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(194,11,250,1) 0%, rgba(104,5,178,1) 100%)",
        )
        .border("#eb0afd")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createPsychicTypeFashion() {
  return new ZFashionBuilder()
    .name("Psychic")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(230,112,188,1) 0%, rgba(204,59,180,1) 100%)",
        )
        .border("#e56fca")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createRockTypeFashion() {
  return new ZFashionBuilder()
    .name("Rock")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(155 141 114) 0%, rgb(192 165 119) 100%)",
        )
        .border("#c9b995")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createSteelTypeFashion() {
  return new ZFashionBuilder()
    .name("Steel")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgb(174 172 167) 0%, rgb(117 114 109) 100%)",
        )
        .border("#cdcbc9")
        .contrast(white())
        .build(),
    )
    .build();
}

export function createShadowTypeFashion() {
  return new ZFashionBuilder()
    .name("Shadow")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(82,81,79,1) 0%, rgba(0,0,0,1) 100%)",
        )
        .border(white())
        .contrast(white())
        .build(),
    )
    .build();
}

export function createUnknownTypeFashion() {
  return new ZFashionBuilder()
    .name("Unknown")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(213,213,213,1) 100%)",
        )
        .border(black())
        .contrast(white())
        .build(),
    )
    .build();
}

export function createWaterTypeFashion() {
  return new ZFashionBuilder()
    .name("Water")
    .idle(
      new ZFashionStateBuilder()
        .main(
          "linear-gradient(180deg, rgba(10,144,240,1) 0%, rgba(10,17,208,1) 100%)",
        )
        .border("#0abaf5")
        .contrast(white())
        .build(),
    )
    .build();
}

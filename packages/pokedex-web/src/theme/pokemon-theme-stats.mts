import type { IZFashion } from "@zthun/fashion-theme";
import {
  hex,
  white,
  ZFashionBuilder,
  ZFashionStateBuilder,
} from "@zthun/fashion-theme";

export interface IZPokemonThemeStats {
  hp: IZFashion;
  attack: IZFashion;
  defense: IZFashion;
  specialAttack: IZFashion;
  specialDefense: IZFashion;
  speed: IZFashion;
}

export function createHpStatFashion() {
  return new ZFashionBuilder()
    .name("HP")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0x2faf39))
        .border(hex(0x36c543))
        //.border(hex(0x239832))
        .contrast(white())
        .build(),
    )
    .build();
}

export function createAttackStatFashion() {
  return new ZFashionBuilder()
    .name("Attack")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0xdf7c39))
        .border(hex(0xfe8f47))
        //.border(hex(0xbc5c1f))
        .contrast(white())
        .build(),
    )
    .build();
}

export function createDefenseStatFashion() {
  return new ZFashionBuilder()
    .name("Defense")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0x39a8e0))
        .border(hex(0x45bffe))
        //.border(hex(0x268fc3))
        .contrast(white())
        .build(),
    )
    .build();
}

export function createSpecialAttackStatFashion() {
  return new ZFashionBuilder()
    .name("Special Attack")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0xeed72c))
        .border(hex(0xfee946))
        // .border(hex(0xbf8d16))
        .contrast(white())
        .build(),
    )
    .build();
}

export function createSpecialDefenseStatFashion() {
  return new ZFashionBuilder()
    .name("Special Defense")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0x3ae1e1))
        .border(hex(0x73fefe))
        //.border(hex(0x17c2c7))
        .contrast(white())
        .build(),
    )
    .build();
}

export function createSpeedStatFashion() {
  return new ZFashionBuilder()
    .name("Speed")
    .idle(
      new ZFashionStateBuilder()
        .main(hex(0x9645fe))
        .border(hex(0xe0c7ff))
        //.border(hex(0x792efe))
        .contrast(white())
        .build(),
    )
    .build();
}

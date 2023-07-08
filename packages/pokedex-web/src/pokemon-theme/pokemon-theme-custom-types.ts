import { ZFashionBuilder, black, hex, white } from '@zthun/fashion-theme';

export function createUnknownTypeFashion() {
  return new ZFashionBuilder().name('Unknown').main(white()).contrast(black()).build();
}

export function createNormalTypeFashion() {
  return new ZFashionBuilder().name('Normal').main(hex(0xd2d2d2)).contrast(black()).build();
}

export function createFightingTypeFashion() {
  return new ZFashionBuilder().name('Fighting').main(hex(0x7f3d14)).contrast(white()).build();
}

export function createFlyingTypeFashion() {
  return new ZFashionBuilder().name('Flying').main(hex(0xabfffb)).contrast(black()).build();
}

export function createPoisonTypeFashion() {
  return new ZFashionBuilder().name('Poison').main(hex(0xb97fc9)).contrast(white()).build();
}

export function createGroundTypeFashion() {
  return new ZFashionBuilder().name('Ground').main(hex(0x551c02)).contrast(white()).build();
}

export function createRockTypeFashion() {
  return new ZFashionBuilder().name('Rock').main(hex(0x443b37)).contrast(white()).build();
}

export function createBugTypeFashion() {
  return new ZFashionBuilder().name('Bug').main(hex(0x23b42f)).contrast(black()).build();
}

export function createGhostTypeFashion() {
  return new ZFashionBuilder().name('Ghost').main(hex(0x5120ad)).contrast(white()).build();
}

export function createSteelTypeFashion() {
  return new ZFashionBuilder().name('Steel').main(hex(0xefefef)).contrast(black()).build();
}

export function createFireTypeFashion() {
  return new ZFashionBuilder().name('Fire').main(hex(0xa1001b)).contrast(white()).build();
}

export function createWaterTypeFashion() {
  return new ZFashionBuilder().name('Water').main(hex(0x095b92)).contrast(white()).build();
}

export function createGrassTypeFashion() {
  return new ZFashionBuilder().name('Grass').main(hex(0x005c17)).contrast(white()).build();
}

export function createElectricTypeFashion() {
  return new ZFashionBuilder().name('Electric').main(hex(0xf7ff00)).contrast(black()).build();
}

export function createPsychicTypeFashion() {
  return new ZFashionBuilder().name('Psychic').main(hex(0x9e0089)).contrast(white()).build();
}

export function createIceTypeFashion() {
  return new ZFashionBuilder().name('Ice').main(hex(0x4accef)).contrast(black()).build();
}

export function createDragonTypeFashion() {
  return new ZFashionBuilder().name('Dragon').main(hex(0x7f0011)).contrast(white()).build();
}

export function createDarkTypeFashion() {
  return new ZFashionBuilder().name('Dark').main(black()).contrast(white()).build();
}

export function createFairyTypeFashion() {
  return new ZFashionBuilder().name('Fairy').main(hex(0xff56d2)).contrast(white()).build();
}

export function createShadowTypeFashion() {
  return new ZFashionBuilder().name('Shadow').main(hex(0x2d2d2d)).contrast(white()).build();
}

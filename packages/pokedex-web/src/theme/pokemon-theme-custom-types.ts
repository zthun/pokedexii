import { ZFashionBuilder, black, white } from '@zthun/fashion-theme';

export function createBugTypeFashion() {
  return new ZFashionBuilder()
    .name('Bug')
    .main('linear-gradient(180deg, rgb(169 201 84) 0%, rgb(91 141 44) 100%)')
    .border('#e0f97a')
    .contrast(white())
    .build();
}

export function createDarkTypeFashion() {
  return new ZFashionBuilder()
    .name('Dark')
    .main('linear-gradient(180deg, rgba(45,40,47,1) 0%, rgba(64,60,67,1) 100%)')
    .border('#555257')
    .contrast(white())
    .build();
}

export function createDragonTypeFashion() {
  return new ZFashionBuilder()
    .name('Dragon')
    .main('linear-gradient(180deg, rgba(68,179,228,1) 25%, rgba(244,90,159,1) 80%)')
    .border('#1d63f1')
    .contrast(white())
    .build();
}

export function createElectricTypeFashion() {
  return new ZFashionBuilder()
    .name('Electric')
    .main('linear-gradient(180deg, rgb(255 200 1) 0%, rgb(169 124 2) 100%)')
    .border('#e9bc00')
    .contrast(white())
    .build();
}

export function createFairyTypeFashion() {
  return new ZFashionBuilder()
    .name('Fairy')
    .main('linear-gradient(180deg, rgb(248 190 219) 0%, rgb(193 82 147) 100%)')
    .border('#feb1e1')
    .contrast(white())
    .build();
}

export function createFightingTypeFashion() {
  return new ZFashionBuilder()
    .name('Fighting')
    .main('linear-gradient(180deg, rgba(197,56,1,1) 0%, rgba(127,40,6,1) 100%)')
    .border('#d95b01')
    .contrast(white())
    .build();
}

export function createFireTypeFashion() {
  return new ZFashionBuilder()
    .name('Fire')
    .main('linear-gradient(180deg, rgba(233,134,13,1) 0%, rgba(208,66,1,1) 100%)')
    .border('#d26201')
    .contrast(white())
    .build();
}

export function createFlyingTypeFashion() {
  return new ZFashionBuilder()
    .name('Flying')
    .main('linear-gradient(180deg, rgba(124,247,253,1) 0%, rgba(8,144,226,1) 100%)')
    .border('#44b3e4')
    .contrast(white())
    .build();
}

export function createGhostTypeFashion() {
  return new ZFashionBuilder()
    .name('Ghost')
    .main('linear-gradient(180deg, rgba(75,45,90,1) 0%, rgba(103,47,133,1) 100%)')
    .border('#9a5cb3')
    .contrast(white())
    .build();
}

export function createGrassTypeFashion() {
  return new ZFashionBuilder()
    .name('Grass')
    .main('linear-gradient(180deg, rgba(145,239,13,1) 0%, rgba(11,167,75,1) 100%)')
    .border('#07b94c')
    .light('#07b94c')
    .contrast(white())
    .build();
}

export function createGroundTypeFashion() {
  return new ZFashionBuilder()
    .name('Ground')
    .main('linear-gradient(180deg, rgb(213 163 18) 0%, rgb(120 71 17) 100%)')
    .border('#a98e40')
    .contrast(white())
    .build();
}

export function createIceTypeFashion() {
  return new ZFashionBuilder()
    .name('Ice')
    .main('linear-gradient(180deg, rgb(106 232 232) 0%, rgb(0 164 168) 100%)')
    .border('#97e0ff')
    .contrast(white())
    .build();
}

export function createNormalTypeFashion() {
  return new ZFashionBuilder()
    .name('Normal')
    .main('linear-gradient(180deg, rgb(167 162 152) 0%, rgb(118 109 94) 100%)')
    .border('#dad4c8')
    .contrast(white())
    .build();
}

export function createPoisonTypeFashion() {
  return new ZFashionBuilder()
    .name('Poison')
    .main('linear-gradient(180deg, rgba(194,11,250,1) 0%, rgba(104,5,178,1) 100%)')
    .border('#eb0afd')
    .light('#a300de')
    .contrast(white())
    .build();
}

export function createPsychicTypeFashion() {
  return new ZFashionBuilder()
    .name('Psychic')
    .main('linear-gradient(180deg, rgba(230,112,188,1) 0%, rgba(204,59,180,1) 100%)')
    .border('#e56fca')
    .contrast(white())
    .build();
}

export function createRockTypeFashion() {
  return new ZFashionBuilder()
    .name('Rock')
    .main('linear-gradient(180deg, rgb(155 141 114) 0%, rgb(192 165 119) 100%)')
    .border('#c9b995')
    .contrast(white())
    .build();
}

export function createSteelTypeFashion() {
  return new ZFashionBuilder()
    .name('Steel')
    .main('linear-gradient(180deg, rgb(174 172 167) 0%, rgb(117 114 109) 100%)')
    .border('#cdcbc9')
    .contrast(white())
    .build();
}

export function createShadowTypeFashion() {
  return new ZFashionBuilder()
    .name('Shadow')
    .main('linear-gradient(180deg, rgba(82,81,79,1) 0%, rgba(0,0,0,1) 100%)')
    .border(white())
    .contrast(white())
    .build();
}

export function createUnknownTypeFashion() {
  return new ZFashionBuilder()
    .name('Unknown')
    .main('linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(213,213,213,1) 100%)')
    .border(black())
    .contrast(white())
    .build();
}

export function createWaterTypeFashion() {
  return new ZFashionBuilder()
    .name('Water')
    .main('linear-gradient(180deg, rgba(10,144,240,1) 0%, rgba(10,17,208,1) 100%)')
    .border('#0abaf5')
    .contrast(white())
    .build();
}

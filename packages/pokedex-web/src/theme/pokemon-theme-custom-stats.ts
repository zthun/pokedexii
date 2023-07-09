import { ZFashionBuilder, hex, white } from '@zthun/fashion-theme';

export function createHpStatFashion() {
  return new ZFashionBuilder()
    .name('HP')
    .main(hex(0x2faf39))
    .light(hex(0x36c543))
    .dark(hex(0x239832))
    .contrast(white())
    .build();
}

export function createAttackStatFashion() {
  return new ZFashionBuilder()
    .name('Attack')
    .main(hex(0xdf7c39))
    .light(hex(0xfe8f47))
    .dark(hex(0xbc5c1f))
    .contrast(white())
    .build();
}

export function createDefenseStatFashion() {
  return new ZFashionBuilder()
    .name('Defense')
    .main(hex(0x39a8e0))
    .light(hex(0x45bffe))
    .dark(hex(0x268fc3))
    .contrast(white())
    .build();
}

export function createSpecialAttackStatFashion() {
  return new ZFashionBuilder()
    .name('Special Attack')
    .main(hex(0xeed72c))
    .light(hex(0xfee946))
    .dark(hex(0xbf8d16))
    .contrast(white())
    .build();
}

export function createSpecialDefenseStatFashion() {
  return new ZFashionBuilder()
    .name('Special Defense')
    .main(hex(0x3ae1e1))
    .light(hex(0x73fefe))
    .dark(hex(0x17c2c7))
    .contrast(white())
    .build();
}

export function createSpeedStatFashion() {
  return new ZFashionBuilder()
    .name('Speed')
    .main(hex(0x9645fe))
    .light(hex(0xe0c7ff))
    .dark(hex(0x792efe))
    .contrast(white())
    .build();
}

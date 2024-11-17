import {
  ZFashionBuilder,
  ZFashionStateBuilder,
  fromRgb,
  rgb,
  white,
} from "@zthun/fashion-theme";

export function createEvolutionFashion() {
  return new ZFashionBuilder()
    .name("Evolution")
    .spectrum(fromRgb(90, 90, 90))
    .idle(
      new ZFashionStateBuilder()
        .main(rgb(90, 90, 90))
        .border(white())
        .contrast(white())
        .build(),
    )
    .focus(new ZFashionStateBuilder().border(rgb(144, 202, 249)).build())
    .build();
}

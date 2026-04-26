import {
  rgb,
  white,
  ZFashionBuilder,
  ZFashionStateBuilder,
} from "@zthun/fashion-theme";

export function createEvolutionFashion() {
  return new ZFashionBuilder()
    .name("Evolution")
    .idle(
      new ZFashionStateBuilder()
        .foreground(rgb(90, 90, 90))
        .border(white())
        .contrast(white())
        .build(),
    )
    .focus(new ZFashionStateBuilder().border(rgb(144, 202, 249)).build())
    .build();
}

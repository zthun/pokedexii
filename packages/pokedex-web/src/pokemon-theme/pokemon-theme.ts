import { IZThemeUtility, useFashionTheme } from '@zthun/fashion-boutique';
import { IZFashionTheme, ZFashionThemeBuilder, createDarkTheme } from '@zthun/fashion-theme';
import { IZPokemonThemeCustom, createPokemonThemeCustom } from './pokemon-theme-custom';

export interface IZPokemonTheme extends IZFashionTheme<IZPokemonThemeCustom> {}
export interface IZPokemonThemeUtility extends IZThemeUtility<IZPokemonThemeCustom> {}

export const usePokemonTheme = () => useFashionTheme<IZPokemonThemeCustom>();

export function createPokemonTheme(): IZFashionTheme<IZPokemonThemeCustom> {
  return new ZFashionThemeBuilder().copy(createDarkTheme()).custom(createPokemonThemeCustom()).build();
}

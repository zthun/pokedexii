import { IZComponentStyle, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZType } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { useMemo } from 'react';
import { IZPokemonThemeUtility } from '../pokemon-theme/pokemon-theme';

export interface IZPokemonTypeBadge extends IZComponentStyle {
  type: ZType;
}

const usePokemonTypeBadgeStyles = createStyleHook(
  ({ theme, tailor }: IZPokemonThemeUtility, props: IZPokemonTypeBadge) => {
    const { type } = props;
    const fashion = theme.custom.types[type];

    return {
      root: {
        color: fashion.contrast,
        backgroundColor: fashion.main,
        borderRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
        textAlign: 'center',
        paddingTop: tailor.gap(ZSizeFixed.ExtraSmall),
        paddingBottom: tailor.gap(ZSizeFixed.ExtraSmall),
        width: '100%'
      }
    };
  }
);

export function ZPokemonTypeBadge(props: IZPokemonTypeBadge) {
  const { type, className } = props;
  const { classes } = usePokemonTypeBadgeStyles(props);
  const name = useMemo(() => startCase(type), [type]);

  return (
    <div className={cssJoinDefined('ZPokemonTypeBadge-root', className, classes.root)} data-name={type}>
      {name}
    </div>
  );
}

import { IZComponentAdornment, IZComponentStyle, ZLineItem, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { ZType } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { useMemo } from 'react';
import { IZPokemonThemeUtility } from '../theme/pokemon-theme';

export interface IZTypeBadge extends IZComponentStyle, IZComponentAdornment {
  type: ZType;
}

const useTypeBadgeStyles = createStyleHook(({ theme, tailor }: IZPokemonThemeUtility, props: IZTypeBadge) => {
  const { type } = props;
  const fashion = theme.custom.types[type];
  const border = firstDefined(fashion.main, fashion.border);

  return {
    root: {
      background: fashion.main,
      border: `${tailor.thickness(ZSizeFixed.Medium)} solid ${border}`,
      borderRadius: tailor.thickness(ZSizeFixed.ExtraLarge),
      color: fashion.contrast,
      padding: tailor.gap(ZSizeFixed.ExtraSmall),
      textAlign: 'center',
      textTransform: 'uppercase'
    }
  };
});

export function ZTypeBadge(props: IZTypeBadge) {
  const { type, className, prefix, suffix } = props;
  const { classes } = useTypeBadgeStyles(props);
  const name = useMemo(() => startCase(type), [type]);

  return (
    <div className={cssJoinDefined('ZTypeBadge-root', className, classes.root)} data-name={type}>
      <ZLineItem prefix={prefix} body={name} suffix={suffix} />
    </div>
  );
}

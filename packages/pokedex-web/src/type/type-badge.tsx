import {
  IZComponentAdornment,
  IZComponentStyle,
  ZCaption,
  ZImageSource,
  ZLineItem,
  ZStack,
  createStyleHook
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { ZType, ZTypeBuilder } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { useMemo } from 'react';
import { IZPokemonThemeUtility } from '../theme/pokemon-theme';

export interface IZTypeBadge extends IZComponentStyle, IZComponentAdornment {
  compact?: boolean;
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
  const { type, className, compact, suffix } = props;
  const { classes } = useTypeBadgeStyles(props);
  const artwork = useMemo(() => new ZTypeBuilder().name(type).build().artwork, [type]);

  const renderBody = () => {
    const icon = (
      <ZImageSource
        className='ZTypeBadge-icon'
        src={artwork}
        name={type}
        width={ZSizeFixed.ExtraSmall}
        height={ZSizeFixed.ExtraSmall}
      />
    );

    const body = compact ? null : <ZCaption className='ZTypeBadge-name'>{startCase(type)}</ZCaption>;

    return (
      <ZStack gap={ZSizeFixed.Small} orientation={ZOrientation.Horizontal} alignItems='center'>
        {icon}
        {body}
      </ZStack>
    );
  };

  return (
    <div className={cssJoinDefined('ZTypeBadge-root', className, classes.root)} data-name={type}>
      <ZLineItem body={renderBody()} suffix={suffix} />
    </div>
  );
}

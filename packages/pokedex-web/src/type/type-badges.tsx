import { IZComponentStyle, ZGrid, ZIconFontAwesome } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZPokemonWeakness, ZType } from '@zthun/pokedex';
import React, { ReactNode, useMemo } from 'react';
import { ZTypeBadge } from './type-badge';

interface IZTypeWithBadge {
  type: ZType;
  suffix?: ReactNode;
}

function typeIsPokemonWeakness(t: any): t is IZPokemonWeakness {
  return typeof t === 'object' && Object.prototype.hasOwnProperty.call(t, 'damage');
}

export interface IZTypeBadges extends IZComponentStyle {
  types: (ZType | IZPokemonWeakness)[];
  compact?: boolean;
}

export function ZTypeBadges(props: IZTypeBadges) {
  const { className, compact, types } = props;

  const render4xDamage = () => (
    <ZIconFontAwesome
      className='ZTypeBadges-4x-damage'
      name='circle-exclamation'
      width={ZSizeFixed.ExtraSmall}
      tooltip='This pokemon receives 4x damage from this type.'
    />
  );

  const typeWithBadge = (type: ZType | IZPokemonWeakness): IZTypeWithBadge => {
    if (typeIsPokemonWeakness(type)) {
      return { type: type.type, suffix: type.damage === 4 ? render4xDamage() : undefined };
    }

    return { type };
  };

  const _types: IZTypeWithBadge[] = useMemo(() => types.map(typeWithBadge), [types]);
  const columns = compact ? 'auto auto auto auto' : '1fr 1fr';
  const columnsXs = compact ? 'auto auto auto auto' : '1fr';

  return (
    <ZGrid
      className={cssJoinDefined('ZTypeBadges-root', className)}
      columns={columns}
      columnsXs={columnsXs}
      justifyContent='start'
      gap={ZSizeFixed.Small}
    >
      {_types.map((t) => (
        <ZTypeBadge key={t.type} compact={compact} type={t.type} suffix={t.suffix} />
      ))}
    </ZGrid>
  );
}

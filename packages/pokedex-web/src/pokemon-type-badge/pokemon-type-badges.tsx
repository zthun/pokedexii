import { ZGrid } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZType } from '@zthun/pokedex';
import { uniq } from 'lodash';
import React, { useMemo } from 'react';
import { ZPokemonTypeBadge } from './pokemon-type-badge';

export interface IZPokemonTypeBadges {
  types?: ZType[];
}

export function ZPokemonTypeBadges(props: IZPokemonTypeBadges) {
  const { types } = props;
  const _types = useMemo(() => uniq(types), [types]);

  return (
    <ZGrid
      className={cssJoinDefined('ZPokemonTypeBadges-root')}
      columns='1fr 1fr'
      columnsXs='1fr'
      gap={ZSizeFixed.Small}
    >
      {_types?.map((t) => (
        <ZPokemonTypeBadge key={t} type={t} />
      ))}
    </ZGrid>
  );
}

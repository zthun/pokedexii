import { ZGrid } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { ZType } from '@zthun/pokedex';
import { uniq } from 'lodash';
import React, { useMemo } from 'react';
import { ZTypeBadge } from './type-badge';

export interface IZTypeBadges {
  types?: ZType[];
}

export function ZTypeBadges(props: IZTypeBadges) {
  const { types } = props;
  const _types = useMemo(() => uniq(types), [types]);

  return (
    <ZGrid className={cssJoinDefined('ZTypeBadges-root')} columns='1fr 1fr' columnsXs='1fr' gap={ZSizeFixed.Small}>
      {_types?.map((t) => (
        <ZTypeBadge key={t} type={t} />
      ))}
    </ZGrid>
  );
}

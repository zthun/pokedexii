import { ZBubble, ZH2, ZH3, ZImageSource, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { IZType, ZType } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React from 'react';
import { usePokemonTheme } from 'src/theme/pokemon-theme';
import { ZResourceCard } from '../resource/resource-card';
import { ZTypeBadges } from './type-badges';
import { useType } from './type-service';

export interface IZTypeCard {
  typeName: ZType;
}

export function ZTypeCard(props: IZTypeCard) {
  const { typeName } = props;
  const [_type] = useType(typeName);
  const { custom } = usePokemonTheme();

  const renderBadges = (header: string, types: ZType[]) => {
    if (!types.length) {
      return null;
    }

    return (
      <>
        <ZH3>{header}</ZH3>
        <ZTypeBadges types={types} compact />
      </>
    );
  };

  const renderType = ([type]: [IZType]) => (
    <ZStack gap={ZSizeFixed.Medium}>
      <ZStack justifyContent='center' alignItems='center'>
        <ZBubble fashion={custom.types[type.name]} width={ZSizeFixed.Medium} padding={ZSizeFixed.Medium}>
          <ZImageSource src={type.artwork} width={ZSizeVaried.Full} />
        </ZBubble>{' '}
        <ZH2>{startCase(type.name)}</ZH2>
      </ZStack>
      {renderBadges('Double Damage From', type.doubleDamageFrom)}
      {renderBadges('Double Damage To', type.doubleDamageTo)}
      {renderBadges('Half Damage From', type.halfDamageFrom)}
      {renderBadges('Half Damage To', type.halfDamageTo)}
      {renderBadges('No Damage From', type.noDamageFrom)}
      {renderBadges('No Damage To', type.noDamageTo)}
    </ZStack>
  );

  return (
    <ZResourceCard className='ZTypeCard-root' resource={_type} name={typeName}>
      {renderType}
    </ZResourceCard>
  );
}

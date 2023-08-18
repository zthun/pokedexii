import { ZIconFontAwesome, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZEvolution } from '@zthun/pokedex';
import React from 'react';
import { ZResourceCard } from '../resource/resource-card';
import { ZEvolutionNodeList } from './evolution-node-list';
import { IZEvolutionResourceCard } from './evolution-resource-card';
import { useEvolution } from './evolution-service';

const useEvolutionChainCardStyles = createStyleHook(({ tailor, device }) => ({
  chain: {
    display: 'flex',
    alignItems: 'center',
    gap: tailor.gap(),
    flexDirection: 'row',

    [device.break(ZSizeFixed.Medium)]: {
      flexDirection: 'column'
    }
  }
}));

export function ZEvolutionChainCard(props: IZEvolutionResourceCard) {
  const { evolutionName } = props;
  const [evolution] = useEvolution(evolutionName);
  const { classes } = useEvolutionChainCardStyles();

  const renderContent = ([content]: IZEvolution[]) => (
    <div className={cssJoinDefined('ZEvolutionChainCard-chain', classes.chain)}>
      <ZEvolutionNodeList nodes={[content.head]} />
    </div>
  );

  return (
    <ZResourceCard
      className={cssJoinDefined('ZEvolutionChainCard-root')}
      CardProps={{
        heading: 'Evolution',
        subHeading: `Growth Path ${evolutionName}`,
        avatar: <ZIconFontAwesome name='globe' width={ZSizeFixed.Small} />
      }}
      resource={evolution}
      name={evolutionName}
    >
      {renderContent}
    </ZResourceCard>
  );
}

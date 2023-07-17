import { ZBubble, ZIconFontAwesome, ZImageSource, ZSuspenseRotate, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { IZEvolutionNode, ZSpeciesBuilder } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React from 'react';
import { usePokemon } from '../pokemon/pokemon-service';
import { useSpecies } from '../species/species-service';

export interface IZEvolutionNodeBubble {
  node: IZEvolutionNode;
}

const useEvolutionBubbleStyles = createStyleHook(({ tailor }) => {
  return {
    name: {
      textAlign: 'center',
      marginTop: tailor.gap(ZSizeFixed.ExtraSmall)
    }
  };
});

export function ZEvolutionNodeBubble(props: IZEvolutionNodeBubble) {
  const { node } = props;
  const [species] = useSpecies(node.species);
  const [pokemon] = usePokemon(asStateData(species)?.main);
  const { classes } = useEvolutionBubbleStyles();

  const renderAvatar = () => {
    if (isStateLoading(species) || isStateLoading(pokemon)) {
      return <ZSuspenseRotate width={ZSizeFixed.Medium} />;
    }

    if (isStateErrored(species) || isStateErrored(pokemon)) {
      return <ZIconFontAwesome name='question' width={ZSizeFixed.Medium} />;
    }

    return <ZImageSource width={ZSizeVaried.Full} src={pokemon.artwork} />;
  };

  const renderName = () => {
    if (isStateLoading(species) || isStateLoading(pokemon)) {
      return 'Loading...';
    }

    if (isStateErrored(species) || isStateErrored(pokemon)) {
      return startCase(new ZSpeciesBuilder().build().name);
    }

    return startCase(species.name);
  };

  return (
    <div className='ZEvolutionNodeBubble-root' data-species={asStateData(species)?.name}>
      <ZBubble
        className={cssJoinDefined('ZEvolutionNodeBubble-avatar')}
        width={ZSizeFixed.Large}
        padding={ZSizeFixed.ExtraSmall}
        border={ZSizeFixed.ExtraLarge}
      >
        {renderAvatar()}
      </ZBubble>
      <div className={cssJoinDefined('ZEvolutionNodeBubble-name', classes.name)}>{renderName()}</div>
    </div>
  );
}

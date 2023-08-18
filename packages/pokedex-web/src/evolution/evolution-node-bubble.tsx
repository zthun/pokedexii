import {
  ZBubble,
  ZIconFontAwesome,
  ZImageSource,
  ZSuspenseRotate,
  createStyleHook,
  useNavigate
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoaded, isStateLoading } from '@zthun/helpful-react';
import { IZEvolutionNode, ZSpeciesBuilder } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React from 'react';
import { useSpecies } from '../species/species-service';
import { usePokemonTheme } from '../theme/pokemon-theme';

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
  const navigate = useNavigate();
  const [species] = useSpecies(node.species);
  const { classes } = useEvolutionBubbleStyles();
  const { custom } = usePokemonTheme();

  const handleClick = isStateLoaded(species) ? navigate.bind(null, `/pokemon/${species.name}`) : undefined;

  const renderAvatar = () => {
    if (isStateLoading(species)) {
      return <ZSuspenseRotate width={ZSizeFixed.Medium} />;
    }

    if (isStateErrored(species)) {
      return <ZIconFontAwesome name='question' width={ZSizeFixed.Medium} />;
    }

    return <ZImageSource width={ZSizeVaried.Full} src={species.artwork} />;
  };

  const renderName = () => {
    if (isStateLoading(species)) {
      return 'Loading...';
    }

    if (isStateErrored(species)) {
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
        fashion={custom.evolution}
        onClick={handleClick}
      >
        {renderAvatar()}
      </ZBubble>
      <div className={cssJoinDefined('ZEvolutionNodeBubble-name', classes.name)}>{renderName()}</div>
    </div>
  );
}

import {
  ZAlert,
  ZCaption,
  ZH3,
  ZIconFontAwesome,
  ZImageSource,
  ZSuspenseProgress,
  createStyleHook
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { padStart, startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { usePokemon } from '../pokemon/pokemon-service';
import { ZTypeBadges } from '../type/type-badges';
import { useSpecies } from './species-service';

/**
 * Props for a species card.
 */
export interface IZSpeciesCard {
  /**
   * The species name.
   */
  speciesName: string;

  /**
   * The optional handler for when the card is clicked.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const useSpeciesCardStyles = createStyleHook(({ theme, tailor }) => ({
  root: {
    'borderRadius': '0.5rem',
    'backgroundColor': theme.surface.main,
    'color': theme.surface.contrast,
    'cursor': 'pointer',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': tailor.gap(ZSizeFixed.Medium),

    '&:hover': {
      outline: `${tailor.thickness()} solid ${theme.primary.main}`
    }
  },

  media: {
    display: 'flex',
    justifyContent: 'center',
    padding: tailor.gap(ZSizeFixed.Small),
    backgroundColor: theme.component.main
  },

  title: {
    fontSize: '1.2rem',
    marginTop: tailor.gap()
  }
}));

/**
 * A component that displays quick species information.
 */
export function ZSpeciesCard(props: IZSpeciesCard) {
  const { speciesName, onClick } = props;
  const [species] = useSpecies(speciesName);
  const [pokemon] = usePokemon(asStateData(species)?.main);
  const { classes } = useSpeciesCardStyles();

  const renderContent = () => {
    const isLoading = isStateLoading(species) || isStateLoading(pokemon);

    if (isLoading) {
      return <ZSuspenseProgress />;
    }

    if (isStateErrored(species)) {
      return (
        <ZAlert
          heading='Error Loading Species'
          message={species.message}
          avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Medium} />}
          name='error'
        />
      );
    }

    if (isStateErrored(pokemon)) {
      return (
        <ZAlert
          heading='Error Loading Pokemon'
          message={pokemon.message}
          avatar={<ZIconFontAwesome name='circle-exclamation' width={ZSizeFixed.Medium} />}
          name='error'
        />
      );
    }

    return (
      <>
        <div className={cssJoinDefined('ZSpeciesCard-media', classes.media)}>
          <ZImageSource src={pokemon.artwork} width={ZSizeFixed.Large} name={pokemon.name} />
        </div>
        <ZCaption className={cssJoinDefined('ZSpeciesCard-number')} compact>
          #{padStart(String(species.id), 4, '0')}
        </ZCaption>
        <ZH3 className={cssJoinDefined('ZSpeciesCard-title', classes.title)}>{startCase(species.name)}</ZH3>
        <ZTypeBadges types={pokemon.types} />
      </>
    );
  };

  return (
    <div className={cssJoinDefined('ZSpeciesCard-root', classes.root)} onClick={onClick} data-name={speciesName}>
      {renderContent()}
    </div>
  );
}

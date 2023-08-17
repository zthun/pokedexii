import { ZCaption, ZH3, ZImageSource, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZSpecies } from '@zthun/pokedex';
import { padStart, startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { ZTypeBadges } from '../type/type-badges';

/**
 * Props for a species card.
 */
export interface IZSpeciesCard {
  /**
   * The species name.
   */
  species: IZSpecies;

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
  const { species, onClick } = props;
  const { classes } = useSpeciesCardStyles();

  const renderContent = () => {
    return (
      <>
        <div className={cssJoinDefined('ZSpeciesCard-media', classes.media)}>
          <ZImageSource src={species.artwork} width={ZSizeFixed.Large} name={species.name} />
        </div>
        <ZCaption className={cssJoinDefined('ZSpeciesCard-number')} compact>
          #{padStart(String(species.id), 4, '0')}
        </ZCaption>
        <ZH3 className={cssJoinDefined('ZSpeciesCard-title', classes.title)}>{startCase(species.name)}</ZH3>
        <ZTypeBadges types={species.types} />
      </>
    );
  };

  return (
    <div className={cssJoinDefined('ZSpeciesCard-root', classes.root)} onClick={onClick} data-name={species.name}>
      {renderContent()}
    </div>
  );
}

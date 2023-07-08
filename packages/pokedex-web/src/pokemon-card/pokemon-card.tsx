import { ZCaption, ZH3, ZImageSource, ZStack, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import { IZPokemon, ZPokemonType } from '@zthun/pokedex';
import { padStart, startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { ZPokemonTypeBadge } from 'src/pokemon-type-badge/pokemon-type-badge';

/**
 * Props for a pokemon card.
 */
export interface IZPokemonCard {
  /**
   * The pokemon to display.
   */
  value: IZPokemon;

  /**
   * The optional handler for when the card is clicked.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const usePokemonCardStyles = createStyleHook(({ theme, tailor }) => ({
  root: {
    'border': `${tailor.thickness(ZSizeFixed.Small)} solid ${theme.opposite.main}`,
    'borderRadius': '0.5rem',
    'backgroundColor': theme.surface.main,
    'color': theme.surface.contrast,
    'cursor': 'pointer',
    'display': 'flex',
    'flexDirection': 'column',
    'padding': tailor.gap(ZSizeFixed.Medium),

    '&:hover': {
      borderColor: theme.primary.main
    }
  },

  media: {
    display: 'flex',
    justifyContent: 'center',
    padding: tailor.gap(ZSizeFixed.Small),
    backgroundColor: theme.component.main
  },

  title: {
    fontSize: '1.2rem'
  },

  types: {
    marginBottom: tailor.gap()
  }
}));

/**
 * A component that displays the pokemon's name, id, and front sprite.
 */
export function ZPokemonCard(props: IZPokemonCard) {
  const { value: pokemon, onClick } = props;
  const { classes } = usePokemonCardStyles();

  const renderTypes = () => {
    const { types } = pokemon;

    const renderType = (t: ZPokemonType) => (
      <ZPokemonTypeBadge className={cssJoinDefined('ZPokemonCard-type')} key={t} type={t} />
    );

    return (
      <ZStack
        className={cssJoinDefined('ZPokemonCard-types', classes.types)}
        orientation={ZOrientation.Horizontal}
        gap={ZSizeFixed.Small}
      >
        {types?.map(renderType)}
      </ZStack>
    );
  };

  return (
    <div
      className={cssJoinDefined('ZPokemonCard-root', classes.root)}
      data-name={pokemon.name}
      data-id={pokemon.id}
      onClick={onClick}
    >
      <div className={cssJoinDefined('ZPokemonCard-media', classes.media)}>
        <ZImageSource src={pokemon.artwork} width={ZSizeFixed.Large} name={pokemon.name} />
      </div>
      <ZCaption className={cssJoinDefined('ZPokemonCard-number')}>#{padStart(String(pokemon.id), 4, '0')}</ZCaption>
      {renderTypes()}
      <ZH3 className={cssJoinDefined('ZPokemonCard-title', classes.title)}>{startCase(pokemon.name)}</ZH3>
    </div>
  );
}
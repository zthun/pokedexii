import { Card, CardHeader, CardMedia } from '@mui/material';
import { IZPokemon } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';

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

const usePokemonCardStyles = makeStyles()((theme) => ({
  card: {
    cursor: 'pointer',
    width: '15rem',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    '.MuiCardHeader-content': {
      width: '100%'
    },

    '.MuiCardHeader-title': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  },
  sprite: {
    width: '6rem',
    alignSelf: 'center',
    padding: theme.spacing()
  }
}));

/**
 * A component that displays the pokemon's name, id, and front sprite.
 */
export function ZPokemonCard(props: IZPokemonCard) {
  const { value: pokemon, onClick } = props;
  const title = startCase(pokemon.name);
  const { classes } = usePokemonCardStyles();

  return (
    <Card
      className={cssClass('ZPokemonCard-root', classes.card)}
      data-name={pokemon.name}
      data-id={pokemon.id}
      onClick={onClick}
      title={title}
    >
      <CardHeader className={cssClass('ZPokemonCard-header', classes.header)} title={title} subheader={pokemon.id} />
      <CardMedia
        className={cssClass('ZPokemonCard-sprite', classes.sprite)}
        component='img'
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
      />
    </Card>
  );
}

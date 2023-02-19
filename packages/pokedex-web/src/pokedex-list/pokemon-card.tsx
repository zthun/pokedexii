import { Card, CardHeader, CardMedia } from '@mui/material';
import { IZPokemon } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';

export interface IZPokemonCard {
  pokemon: IZPokemon;

  onClick?: MouseEventHandler<HTMLDivElement>;
}

const usePokemonCardStyles = makeStyles()(() => ({
  card: {
    cursor: 'pointer',
    width: '10rem'
  }
}));

export function ZPokemonCard(props: IZPokemonCard) {
  const { pokemon, onClick } = props;
  const styles = usePokemonCardStyles();

  return (
    <Card
      className={cssClass('ZPokemonCard-root', styles.classes.card)}
      data-name={pokemon.name}
      data-id={pokemon.id}
      onClick={onClick}
    >
      <CardHeader className='ZPokemonCard-header' title={startCase(pokemon.name)} subheader={pokemon.id}></CardHeader>
      <CardMedia
        className='ZPokemonCard-sprite'
        component='img'
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
      />
    </Card>
  );
}

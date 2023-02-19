import { Card, CardHeader, CardMedia } from '@mui/material';
import { IZPokemon } from '@zthun/pokedex';
import React from 'react';
import { makeStyles } from '../theme/make-styles';
import { cssClass } from '../util/css-class';

export interface IZPokemonCard {
  pokemon: IZPokemon;
}

const usePokemonCardStyles = makeStyles()(() => ({
  card: {
    cursor: 'pointer',
    width: '10rem'
  }
}));

export function ZPokemonCard(props: IZPokemonCard) {
  const { pokemon } = props;
  const styles = usePokemonCardStyles();

  const className = cssClass('ZPokemonCard-root', styles.classes.card);
  return (
    <Card className={className}>
      <CardHeader title={pokemon.name}></CardHeader>
      <CardMedia component='img' src={pokemon.sprites?.front_default} alt={pokemon.name} />
    </Card>
  );
}

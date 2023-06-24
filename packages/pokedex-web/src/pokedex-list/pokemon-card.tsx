import { ZCard, ZImageSource, ZLink } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZPokemon } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { MouseEventHandler } from 'react';

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

/**
 * A component that displays the pokemon's name, id, and front sprite.
 */
export function ZPokemonCard(props: IZPokemonCard) {
  const { value: pokemon } = props;
  const name = startCase(pokemon.name);

  return (
    <ZCard
      className={cssJoinDefined('ZPokemonCard-root')}
      data-name={pokemon.name}
      data-id={pokemon.id}
      heading={<ZLink href={`#/pokemon/${pokemon.name}`} label={name} />}
      subHeading={pokemon.id}
    >
      <ZImageSource src={pokemon.sprites?.front_default} width={ZSizeFixed.Large} name={pokemon.name} />
    </ZCard>
  );
}

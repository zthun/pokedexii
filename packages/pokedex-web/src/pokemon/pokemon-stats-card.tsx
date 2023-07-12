import { ZChartProgress, ZDataPointBuilder, ZIconFontAwesome, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZPokemon, ZPokemonMaxBaseStat } from '@zthun/pokedex';
import React from 'react';
import { ZResourceCard } from '../resource/resource-card';
import { usePokemonTheme } from '../theme/pokemon-theme';
import { IZPokemonInformationCard } from './pokemon-resource-card';
import { usePokemon } from './pokemon-service';

export function ZPokemonStatsCard(props: IZPokemonInformationCard) {
  const { pokemonName } = props;
  const [pokemon] = usePokemon(pokemonName);
  const { custom } = usePokemonTheme();

  const renderContent = (pokemon: IZPokemon) => {
    const { stats } = pokemon;

    const hp = new ZDataPointBuilder(stats.hp.base, ZPokemonMaxBaseStat)
      .name('Hit Points')
      .fashion(custom.stats.hp)
      .build();
    const attack = new ZDataPointBuilder(stats.attack.base, ZPokemonMaxBaseStat)
      .name('Attack')
      .fashion(custom.stats.attack)
      .build();
    const defense = new ZDataPointBuilder(stats.defense.base, ZPokemonMaxBaseStat)
      .name('Defense')
      .fashion(custom.stats.defense)
      .build();
    const specialAttack = new ZDataPointBuilder(stats.specialAttack.base, ZPokemonMaxBaseStat)
      .name('Special Attack')
      .fashion(custom.stats.specialAttack)
      .build();
    const specialDefense = new ZDataPointBuilder(stats.specialDefense.base, ZPokemonMaxBaseStat)
      .name('Special Defense')
      .fashion(custom.stats.specialDefense)
      .build();
    const speed = new ZDataPointBuilder(stats.speed.base, ZPokemonMaxBaseStat)
      .name('Speed')
      .fashion(custom.stats.speed)
      .build();

    return (
      <ZStack gap={ZSizeFixed.Small}>
        <ZChartProgress points={hp} height={ZSizeFixed.Small} name='hp' />
        <ZChartProgress points={attack} height={ZSizeFixed.Small} name='attack' />
        <ZChartProgress points={defense} height={ZSizeFixed.Small} name='defense' />
        <ZChartProgress points={specialAttack} height={ZSizeFixed.Small} name='special-attack' />
        <ZChartProgress points={specialDefense} height={ZSizeFixed.Small} name='special-defense' />
        <ZChartProgress points={speed} height={ZSizeFixed.Small} name='speed' />
      </ZStack>
    );
  };

  return (
    <ZResourceCard
      className={cssJoinDefined('ZPokemonStatsCard-root')}
      CardProps={{
        heading: 'Stats',
        subHeading: `Max base value is ${ZPokemonMaxBaseStat}`,
        avatar: <ZIconFontAwesome name='star' width={ZSizeFixed.Small} />
      }}
      resource={pokemon}
      name={pokemonName}
    >
      {renderContent}
    </ZResourceCard>
  );
}

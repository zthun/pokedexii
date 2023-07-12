import {
  ZBox,
  ZCard,
  ZChartProgress,
  ZDataPointBuilder,
  ZGrid,
  ZIconFontAwesome,
  ZImageSource,
  ZNotFound,
  ZStack,
  ZSuspenseRotate,
  useParams
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { asStateData, isStateErrored, isStateLoading } from '@zthun/helpful-react';
import { IZPokemon, ZPokemonMaxBaseStat } from '@zthun/pokedex';
import { padStart, startCase } from 'lodash';
import React, { useMemo } from 'react';
import { ZPokemonAttributesCard } from 'src/pokemon/pokemon-attributes-card';
import { usePokemon } from '../pokemon/pokemon-service';
import { usePokemonTheme } from '../theme/pokemon-theme';
import { useSpecies } from './species-service';

/**
 * Represents the page for pokemon details.
 */
export function ZSpeciesDetailsPage() {
  const { name } = useParams();
  const [species] = useSpecies(name);
  const [pokemon] = usePokemon(asStateData(species)?.main);

  const heading = useMemo(() => startCase(asStateData(pokemon)?.name), [pokemon]);
  const subHeading = useMemo(() => `#${padStart(String(asStateData(pokemon)?.id || '0'), 4, '0')}`, [pokemon]);
  const { component, custom } = usePokemonTheme();

  const renderPokemon = (pokemon: IZPokemon) => (
    <ZCard
      className={cssJoinDefined('ZSpeciesDetailsPage-artwork')}
      heading={heading}
      subHeading={subHeading}
      name='pokemon'
      avatar={<ZIconFontAwesome name='palette' width={ZSizeFixed.Small} />}
    >
      <ZStack gap={ZSizeFixed.Small}>
        <ZBox fashion={component}>
          <ZImageSource src={pokemon.artwork} width={ZSizeVaried.Full} name='artwork' />
        </ZBox>
      </ZStack>
    </ZCard>
  );

  const renderStats = (pokemon: IZPokemon) => {
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
      <ZCard
        className={cssJoinDefined('ZSpeciesDetailsPage-stats')}
        heading='Stats'
        subHeading={`Max base value is ${ZPokemonMaxBaseStat}`}
        name='stats'
        avatar={<ZIconFontAwesome name='star' width={ZSizeFixed.Small} />}
      >
        <ZStack gap={ZSizeFixed.Small}>
          <ZChartProgress points={hp} height={ZSizeFixed.Small} name='hp' />
          <ZChartProgress points={attack} height={ZSizeFixed.Small} name='attack' />
          <ZChartProgress points={defense} height={ZSizeFixed.Small} name='defense' />
          <ZChartProgress points={specialAttack} height={ZSizeFixed.Small} name='special-attack' />
          <ZChartProgress points={specialDefense} height={ZSizeFixed.Small} name='special-defense' />
          <ZChartProgress points={speed} height={ZSizeFixed.Small} name='speed' />
        </ZStack>
      </ZCard>
    );
  };

  const renderPage = () => {
    if (!name) {
      return <ZNotFound />;
    }

    if (isStateLoading(species) || isStateLoading(pokemon)) {
      return <ZSuspenseRotate width={ZSizeFixed.ExtraLarge} />;
    }

    if (isStateErrored(species) || isStateErrored(pokemon)) {
      return <ZNotFound />;
    }

    return (
      <ZGrid justifyContent='center' columns='auto auto 1fr' columnsMd='1fr 1fr' columnsSm='1fr' gap={ZSizeFixed.Small}>
        {renderPokemon(pokemon)}
        <ZPokemonAttributesCard pokemonName={species.main} />
        {renderStats(pokemon)}
      </ZGrid>
    );
  };

  return <div className='ZSpeciesDetailsPage-root'>{renderPage()}</div>;
}

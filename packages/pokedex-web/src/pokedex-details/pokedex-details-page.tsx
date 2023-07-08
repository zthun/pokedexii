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
import { usePokemonTheme } from '../pokemon-theme/pokemon-theme';
import { ZPokemonTypeBadges } from '../pokemon-type-badge/pokemon-type-badges';
import { usePokemon } from '../pokemon/pokemon-service';

/**
 * Represents the page for pokemon details.
 */
export function ZPokedexDetailsPage() {
  const { name } = useParams();
  const [pokemon] = usePokemon(name);
  const heading = useMemo(() => startCase(asStateData(pokemon)?.name), [pokemon]);
  const subHeading = useMemo(() => `#${padStart(String(asStateData(pokemon)?.id || '0'), 4, '0')}`, [pokemon]);
  const { component, custom } = usePokemonTheme();

  const renderArtwork = (pokemon: IZPokemon) => (
    <ZCard
      className={cssJoinDefined('ZPokedexDetailsPage-artwork')}
      heading={heading}
      subHeading={subHeading}
      width={ZSizeFixed.Large}
      widthXs={ZSizeVaried.Full}
      avatar={<ZIconFontAwesome name='palette' width={ZSizeFixed.Small} />}
    >
      <ZStack gap={ZSizeFixed.Small}>
        <ZPokemonTypeBadges types={pokemon.types} />
        <ZBox fashion={component}>
          <ZImageSource src={pokemon.artwork} width={ZSizeVaried.Full} />
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
        className={cssJoinDefined('ZPokedexDetailsPage-stats')}
        heading='Stats'
        subHeading={`Max base value is ${ZPokemonMaxBaseStat}`}
        avatar={<ZIconFontAwesome name='star' width={ZSizeFixed.Small} />}
      >
        <ZStack gap={ZSizeFixed.Small}>
          <ZChartProgress points={hp} height={ZSizeFixed.Small} />
          <ZChartProgress points={attack} height={ZSizeFixed.Small} />
          <ZChartProgress points={defense} height={ZSizeFixed.Small} />
          <ZChartProgress points={specialAttack} height={ZSizeFixed.Small} />
          <ZChartProgress points={specialDefense} height={ZSizeFixed.Small} />
          <ZChartProgress points={speed} height={ZSizeFixed.Small} />
        </ZStack>
      </ZCard>
    );
  };

  const renderPage = () => {
    if (isStateLoading(pokemon)) {
      return <ZSuspenseRotate width={ZSizeFixed.ExtraLarge} />;
    }

    if (isStateErrored(pokemon)) {
      return <ZNotFound />;
    }

    return (
      <ZGrid justifyContent='center' columns='auto 1fr auto' columnsSm='1fr' gap={ZSizeFixed.Small}>
        {renderArtwork(pokemon)}
        {renderStats(pokemon)}
      </ZGrid>
    );
  };

  return <div className='ZPokedexDetailsPage-root'>{renderPage()}</div>;
}

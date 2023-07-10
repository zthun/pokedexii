import {
  ZBox,
  ZCaption,
  ZCard,
  ZChartProgress,
  ZDataPointBuilder,
  ZGrid,
  ZIconFontAwesome,
  ZImageSource,
  ZLabeled,
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
import React, { ReactNode, useMemo } from 'react';
import { usePokemonTheme } from '../theme/pokemon-theme';
import { ZTypeBadges } from '../type/type-badges';
import { usePokemon } from './pokemon-service';

/**
 * Represents the page for pokemon details.
 */
export function ZPokemonDetailsPage() {
  const { name } = useParams();
  const [pokemon] = usePokemon(name);
  const heading = useMemo(() => startCase(asStateData(pokemon)?.name), [pokemon]);
  const subHeading = useMemo(() => `#${padStart(String(asStateData(pokemon)?.id || '0'), 4, '0')}`, [pokemon]);
  const { component, custom } = usePokemonTheme();

  const renderPokemon = (pokemon: IZPokemon) => (
    <ZCard
      className={cssJoinDefined('ZPokemonDetailsPage-artwork')}
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
        className={cssJoinDefined('ZPokemonDetailsPage-stats')}
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

  const renderAttributes = (pokemon: IZPokemon) => {
    const { height, weight, types, weaknesses } = pokemon;

    const renderAttribute = (label: ReactNode, value: ReactNode) => (
      <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
        <ZLabeled label={label}>{value}</ZLabeled>
      </ZBox>
    );

    const renderHeight = () => {
      const inchesPerDecimeter = 3.937;
      const inches = Math.round(height * inchesPerDecimeter);
      const ft = Math.floor(inches / 12);
      const inch = inches % 12;
      const _height = `${ft}' ${inch}"`;

      return renderAttribute(
        'Height',
        <ZCaption className={cssJoinDefined('ZPokemonDetailsPage-height')} compact>
          {_height}
        </ZCaption>
      );
    };

    const renderWeight = () => {
      const hectogramsPerPound = 4.536;
      const pounds = weight / hectogramsPerPound;
      const lbs = +pounds.toFixed(2);
      const _weight = `${lbs} lbs`;

      return renderAttribute(
        'Weight',
        <ZCaption className={cssJoinDefined('ZPokemonDetailsPage-weight')} compact>
          {_weight}
        </ZCaption>
      );
    };

    return (
      <ZCard
        className={cssJoinDefined('ZPokemonDetailsPage-attributes')}
        heading='Attributes'
        subHeading='Physical Aspects'
        name='attributes'
        avatar={<ZIconFontAwesome name='dumbbell' width={ZSizeFixed.Small} />}
      >
        {renderHeight()}
        {renderWeight()}
        {renderAttribute('Types', <ZTypeBadges className='ZPokemonDetailsPage-types' types={types} />)}
        {renderAttribute('Weaknesses', <ZTypeBadges className='ZPokemonDetailsPage-weaknesses' types={weaknesses} />)}
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
      <ZGrid justifyContent='center' columns='auto auto 1fr' columnsMd='1fr 1fr' columnsSm='1fr' gap={ZSizeFixed.Small}>
        {renderPokemon(pokemon)}
        {renderAttributes(pokemon)}
        {renderStats(pokemon)}
      </ZGrid>
    );
  };

  return <div className='ZPokemonDetailsPage-root'>{renderPage()}</div>;
}

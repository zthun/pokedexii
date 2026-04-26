import {
  useFashionTheme,
  ZBox,
  ZCaption,
  ZIconFontAwesome,
  ZLabeled,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import type { IZPokemon, IZPokemonAbility } from "@zthun/pokedex";
import { startCase } from "lodash-es";
import type { ReactNode } from "react";

import { ZResourceCard } from "../resource/resource-card.js";
import { ZTypeBadges } from "../type/type-badges.js";
import type { IZPokemonResourceCard } from "./pokemon-resource-card.mjs";
import { usePokemon } from "./pokemon-service.mjs";

export function ZPokemonAttributesCard(props: IZPokemonResourceCard) {
  const { pokemonName } = props;
  const [pokemon] = usePokemon(pokemonName);
  const { success: hidden, inherit } = useFashionTheme();

  const renderAttribute = (label: ReactNode, value: ReactNode) => (
    <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
      <ZLabeled label={label}>{value}</ZLabeled>
    </ZBox>
  );

  const renderHeight = (pokemon: IZPokemon) => {
    const { height } = pokemon;
    const inchesPerDecimeter = 3.937;
    const inches = Math.round(height * inchesPerDecimeter);
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    const _height = `${ft}' ${inch}"`;

    return renderAttribute(
      "Height",
      <ZCaption
        className={cssJoinDefined("ZPokemonAttributesCard-height")}
        compact
      >
        {_height}
      </ZCaption>,
    );
  };

  const renderWeight = (pokemon: IZPokemon) => {
    const { weight } = pokemon;
    const hectogramsPerPound = 4.536;
    const pounds = weight / hectogramsPerPound;
    const lbs = +pounds.toFixed(2);
    const _weight = `${lbs} lbs`;

    return renderAttribute(
      "Weight",
      <ZCaption
        className={cssJoinDefined("ZPokemonAttributesCard-weight")}
        compact
      >
        {_weight}
      </ZCaption>,
    );
  };

  const renderAbilities = (pokemon: IZPokemon) => {
    const { abilities } = pokemon;

    const renderAbility = (ability: IZPokemonAbility) => {
      const flavor = startCase(ability.name);
      return (
        <ZCaption
          className={cssJoinDefined("ZPokemonAttributesCard-ability")}
          compact
          fashion={ability.hidden ? hidden : inherit}
          key={ability.name}
        >
          {ability.hidden ? `${flavor} (Hidden)` : flavor}
        </ZCaption>
      );
    };

    return renderAttribute(
      "Abilities",
      <ZStack className={cssJoinDefined("ZPokemonAttributesCard-abilities")}>
        {abilities.map(renderAbility)}
      </ZStack>,
    );
  };

  const renderContent = ([pokemon]: IZPokemon[]) => {
    const { types, weaknesses } = pokemon;
    return (
      <>
        {renderHeight(pokemon)}
        {renderWeight(pokemon)}
        {renderAbilities(pokemon)}
        {renderAttribute(
          "Types",
          <ZTypeBadges
            className="ZPokemonAttributesCard-types"
            types={types}
          />,
        )}
        {renderAttribute(
          "Weaknesses",
          <ZTypeBadges
            className="ZPokemonAttributesCard-weaknesses"
            types={weaknesses}
          />,
        )}
      </>
    );
  };

  return (
    <ZResourceCard
      className={cssJoinDefined("ZPokemonAttributesCard-root")}
      CardProps={{
        TitleProps: {
          heading: "Attributes",
          subHeading: "Physical Aspects",
          avatar: <ZIconFontAwesome name="dumbbell" width={ZSizeFixed.Small} />,
        },
      }}
      resource={pokemon}
      name={pokemonName}
    >
      {renderContent}
    </ZResourceCard>
  );
}

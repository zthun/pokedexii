import {
  ZButton,
  ZCard,
  ZIconFontAwesome,
  ZImage,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import type { IZSpecies } from "@zthun/pokedex";
import { padStart, startCase } from "lodash-es";
import type { MouseEventHandler } from "react";

import { ZTypeBadges } from "../type/type-badges.js";

/**
 * Props for a species card.
 */
export interface IZSpeciesCard {
  /**
   * The species name.
   */
  species: IZSpecies;

  /**
   * The optional handler for when the card is clicked.
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

/**
 * A component that displays quick species information.
 */
export function ZSpeciesCard(props: IZSpeciesCard) {
  const { species, onClick } = props;

  const renderContent = () => {
    return (
      <ZStack
        orientation={ZOrientation.Horizontal}
        justify={{ content: "center" }}
      >
        <ZImage
          className={cssJoinDefined("ZSpeciesCard-media")}
          src={species.artwork}
          width={ZSizeFixed.ExtraLarge}
          height={ZSizeVaried.Full}
          fit="scale-down"
          name={species.name}
        />
      </ZStack>
    );
  };

  return (
    <ZCard
      className={cssJoinDefined("ZSpeciesCard-root")}
      name={species.name}
      TitleProps={{
        suffix: (
          <ZButton
            name="view"
            label={<ZIconFontAwesome name="magnifying-glass" />}
            onClick={onClick}
          />
        ),
        heading: startCase(species.name),
        subHeading: `#${padStart(String(species.id), 4, "0")}`,
      }}
      footer={<ZTypeBadges types={species.types} />}
    >
      {renderContent()}
    </ZCard>
  );
}

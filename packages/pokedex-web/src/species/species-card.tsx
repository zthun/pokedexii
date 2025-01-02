import { ZBox, ZCard, ZImageSource, ZStack } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { IZSpecies } from "@zthun/pokedex";
import { padStart, startCase } from "lodash-es";
import { MouseEventHandler } from "react";
import { ZTypeBadges } from "../type/type-badges";

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
  onClick?: MouseEventHandler<HTMLDivElement>;
}

/*
const useSpeciesCardStyles = createStyleHook(({ theme, tailor }) => ({
  root: {
    borderRadius: "0.5rem",
    backgroundColor: theme.surface.main,
    color: theme.surface.contrast,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    padding: tailor.gap(ZSizeFixed.Medium),

    "&:hover": {
      outline: `${tailor.thickness()} solid ${theme.primary.main}`,
    },
  },

  media: {
    display: "flex",
    justifyContent: "center",
    padding: tailor.gap(ZSizeFixed.Small),
    backgroundColor: theme.component.main,
  },

  title: {
    fontSize: "1.2rem",
    marginTop: tailor.gap(),
  },
}));
*/

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
        <ZImageSource
          className={cssJoinDefined("ZSpeciesCard-media")}
          src={species.artwork}
          width={ZSizeFixed.Large}
          name={species.name}
        />
      </ZStack>
    );
  };

  return (
    <ZBox onClick={onClick} cursor="pointer">
      <ZCard
        className={cssJoinDefined("ZSpeciesCard-root")}
        data-name={species.name}
        TitleProps={{
          heading: startCase(species.name),
          subHeading: `#${padStart(String(species.id), 4, "0")}`,
        }}
        footer={<ZTypeBadges types={species.types} />}
      >
        {renderContent()}
      </ZCard>
    </ZBox>
  );
}

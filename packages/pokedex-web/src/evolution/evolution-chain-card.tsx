import {
  useCss,
  useFashionDevice,
  useFashionTailor,
  ZIconFontAwesome,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { IZEvolution } from "@zthun/pokedex";
import { ReactNode } from "react";
import { ZResourceCard } from "../resource/resource-card";
import { ZEvolutionNodeList } from "./evolution-node-list";
import { IZEvolutionResourceCard } from "./evolution-resource-card";
import { useEvolution } from "./evolution-service.mjs";

export function ZEvolutionChainCard(props: IZEvolutionResourceCard) {
  const tailor = useFashionTailor();
  const device = useFashionDevice();
  const { evolutionName } = props;
  const [evolution] = useEvolution(evolutionName);

  const _className = useCss(css`
    .ZEvolutionChainCard-chain {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: ${tailor.gap()};
    }

    ${device.break(ZSizeFixed.Medium)} {
      .ZEvolutionChainCard-chain {
        flex-direction: column;
      }
    },
  `);

  const renderContent = ([content]: IZEvolution[]): ReactNode => (
    <div className={cssJoinDefined("ZEvolutionChainCard-chain")}>
      <ZEvolutionNodeList nodes={[content.head]} />
    </div>
  );

  return (
    <ZResourceCard
      className={cssJoinDefined("ZEvolutionChainCard-root", _className)}
      CardProps={{
        TitleProps: {
          heading: "Evolution",
          subHeading: `Growth Path ${evolutionName}`,
          avatar: <ZIconFontAwesome name="globe" width={ZSizeFixed.Small} />,
        },
      }}
      resource={evolution}
      name={evolutionName}
    >
      {renderContent}
    </ZResourceCard>
  );
}

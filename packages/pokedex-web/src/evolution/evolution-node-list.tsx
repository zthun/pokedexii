import {
  IZComponentName,
  useCss,
  useFashionDevice,
  ZBox,
  ZCaption,
  ZCarousel,
  ZIconFontAwesome,
  ZLabel,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { IZEvolutionNode, IZEvolutionTrigger } from "@zthun/pokedex";
import { startCase } from "lodash-es";
import { ReactNode, useState } from "react";
import { ZEvolutionNodeBubble } from "./evolution-node-bubble";

export interface IZEvolutionNodeList extends IZComponentName {
  nodes: IZEvolutionNode[];
}

export function ZEvolutionNodeList(props: IZEvolutionNodeList) {
  const { nodes } = props;
  const [index, setIndex] = useState(0);
  const device = useFashionDevice();

  const _className = useCss(css`
    [${device.break(ZSizeFixed.Medium)}]: {
      .ZEvolutionNodeList-next {
        rotate: "90deg";
      }
    }
  `);

  const renderNodeCarousel = () => (
    <ZCarousel
      className={cssJoinDefined("ZEvolutionNodeList-root")}
      count={nodes.length}
      value={index}
      onValueChange={setIndex}
      renderAtIndex={(i) => <ZEvolutionNodeBubble node={nodes[i]} />}
    />
  );

  const renderTrigger = (trigger: IZEvolutionTrigger, index: number) => {
    const requirements: ReactNode[] = [];

    const addRequirement = (value: any, name: string) => {
      if (value != null && value !== false) {
        const text = `${name}: ${startCase(String(value))}`;
        requirements.push(
          <ZCaption key={name} compact>
            {text}
          </ZCaption>,
        );
      }
    };

    requirements.push(
      <ZLabel key={trigger.name}>{startCase(trigger.name)}</ZLabel>,
    );

    addRequirement(trigger.affection, "Affection");
    addRequirement(trigger.beauty, "Beauty");
    addRequirement(trigger.gender, "Gender");
    addRequirement(trigger.happiness, "Happiness");
    addRequirement(trigger.held, "Hold");
    addRequirement(trigger.item, "Item");
    addRequirement(trigger.level, "Level");
    addRequirement(trigger.location, "Location");
    addRequirement(trigger.move, "Move");
    addRequirement(trigger.moveType, "Move Type");
    addRequirement(trigger.partySpecies, "Party Species");
    addRequirement(trigger.partyType, "Party Type");
    addRequirement(trigger.rain, "Rain");
    addRequirement(trigger.stats, "Stats");
    addRequirement(trigger.time, "Time");
    addRequirement(trigger.trade, "Trade");
    addRequirement(trigger.turnUpsideDown, "Turn Upside Down");

    return (
      <div className="ZEvolution-trigger" key={`${trigger.name}-${index}`}>
        {requirements}
      </div>
    );
  };

  const renderTriggers = () => {
    const { triggers } = nodes[index];

    if (!triggers.length) {
      return null;
    }

    return (
      <ZStack
        className={cssJoinDefined("ZEvolutionNodeList-triggers", _className)}
        align={{ items: "center" }}
        justify={{ content: "center" }}
      >
        <ZBox margin={{ bottom: ZSizeFixed.ExtraSmall }}>
          <ZIconFontAwesome
            className={cssJoinDefined("ZEvolutionNodeList-next")}
            name="right-long"
            width={ZSizeFixed.Small}
          />
        </ZBox>
        <ZStack align={{ items: "start" }} gap={ZSizeFixed.ExtraSmall}>
          {triggers.map(renderTrigger)}
        </ZStack>
      </ZStack>
    );
  };

  const renderNext = () => {
    const { next } = nodes[index];

    if (!next.length) {
      return null;
    }

    return (
      <>
        <ZEvolutionNodeList nodes={next} />
      </>
    );
  };

  return (
    <>
      {renderTriggers()}
      {renderNodeCarousel()}
      {renderNext()}
    </>
  );
}

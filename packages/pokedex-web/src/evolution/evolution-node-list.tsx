import {
  IZComponentName,
  ZBox,
  ZCaption,
  ZCarousel,
  ZIconFontAwesome,
  ZLabel,
  ZStack,
  createStyleHook
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZEvolutionNode, IZEvolutionTrigger } from '@zthun/pokedex';
import { startCase } from 'lodash';
import React, { ReactNode, useState } from 'react';
import { ZEvolutionNodeBubble } from './evolution-node-bubble';

export interface IZEvolutionNodeList extends IZComponentName {
  nodes: IZEvolutionNode[];
}

const useEvolutionNodeListStyles = createStyleHook(({ device }) => {
  return {
    next: {
      [device.break(ZSizeFixed.Medium)]: {
        rotate: '90deg'
      }
    }
  };
});

export function ZEvolutionNodeList(props: IZEvolutionNodeList) {
  const { nodes } = props;
  const [index, setIndex] = useState(0);
  const { classes } = useEvolutionNodeListStyles();

  const renderNodeCarousel = () => (
    <ZCarousel
      className={cssJoinDefined('ZEvolutionNodeList-root')}
      count={nodes.length}
      value={index}
      onValueChange={setIndex}
      renderAtIndex={(i) => <ZEvolutionNodeBubble node={nodes[i]} />}
    />
  );

  const renderTrigger = (trigger: IZEvolutionTrigger) => {
    const requirements: ReactNode[] = [];

    const addRequirement = (value: any, name: string) => {
      if (value != null && value !== false) {
        const text = `${name}: ${startCase(String(value))}`;
        requirements.push(
          <ZCaption key={name} compact>
            {text}
          </ZCaption>
        );
      }
    };

    requirements.push(<ZLabel key={trigger.name}>{startCase(trigger.name)}</ZLabel>);

    addRequirement(trigger.affection, 'Affection');
    addRequirement(trigger.beauty, 'Beauty');
    addRequirement(trigger.gender, 'Gender');
    addRequirement(trigger.happiness, 'Happiness');
    addRequirement(trigger.held, 'Hold');
    addRequirement(trigger.item, 'Item');
    addRequirement(trigger.level, 'Level');
    addRequirement(trigger.location, 'Location');
    addRequirement(trigger.move, 'Move');
    addRequirement(trigger.moveType, 'Move Type');
    addRequirement(trigger.partySpecies, 'Party Species');
    addRequirement(trigger.partyType, 'Party Type');
    addRequirement(trigger.rain, 'Rain');
    addRequirement(trigger.stats, 'Stats');
    addRequirement(trigger.time, 'Time');
    addRequirement(trigger.trade, 'Trade');
    addRequirement(trigger.turnUpsideDown, 'Turn Upside Down');

    return (
      <div className='ZEvolution-trigger' key={trigger.name}>
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
      <ZStack className='ZEvolutionNodeList-triggers' alignItems='center' justifyContent='center'>
        <ZBox margin={{ bottom: ZSizeFixed.ExtraSmall }}>
          <ZIconFontAwesome
            className={cssJoinDefined('ZEvolutionNodeList-next', classes.next)}
            name='right-long'
            width={ZSizeFixed.Small}
          />
        </ZBox>
        <ZStack alignItems='start' gap={ZSizeFixed.ExtraSmall}>
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

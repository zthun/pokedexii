import { IZComponentName, ZCarousel, ZIconFontAwesome, createStyleHook } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { IZEvolutionNode } from '@zthun/pokedex';
import React, { useState } from 'react';
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

  const renderNext = () => {
    const { next } = nodes[index];

    if (!next.length) {
      return null;
    }

    return (
      <>
        <ZIconFontAwesome
          className={cssJoinDefined('ZEvolutionNodeList-next', classes.next)}
          name='right-long'
          width={ZSizeFixed.Small}
        />
        <ZEvolutionNodeList nodes={next} />
      </>
    );
  };

  return (
    <>
      {renderNodeCarousel()}
      {renderNext()}
    </>
  );
}

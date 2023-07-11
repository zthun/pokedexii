import { IZPokedexNamedResource } from 'src/pokedex-resource/pokedex-named-resource';
import { IZEvolutionNode, ZEvolutionNodeBuilder } from './evolution-node';

/**
 * Represents an evolution chain.
 */
export interface IZEvolution extends IZPokedexNamedResource<number> {
  /**
   * Represents the head node.
   */
  head: IZEvolutionNode;
}

export class ZEvolutionBuilder {
  private _evolution: IZEvolution;

  public constructor() {
    this._evolution = {
      name: 0,
      head: new ZEvolutionNodeBuilder().build()
    };
  }

  /**
   * Sets the evolution name.
   *
   * Evolution names are just numeric ids.  Note that all stages of
   * an evolution chain have the same id.  For example, the evolution chain
   * for gardevoir is the same as ralts.  The name alone will always bring you
   * back to the first entry in the chain, even if you are in the middle
   * of it.
   *
   * Thus, in order to correctly identity where you are in the chain, you
   * need both, the name and the species.
   *
   * @param name -
   *        The name id.
   *
   * @returns
   *        This object.
   */
  public name(name: number) {
    this._evolution.name = name;
    return this;
  }

  /**
   * Sets the head node.
   *
   * @param node -
   *        The head node.
   *
   * @returns
   *        This object.
   */
  public head(node: IZEvolutionNode) {
    this._evolution.head = node;
    return this;
  }

  /**
   * Sets the evolution chain that starts with ralts.
   *
   * @returns
   *        This object.
   */
  public ralts() {
    return this.name(140).head(new ZEvolutionNodeBuilder().ralts().build());
  }

  /**
   * Builds the evolution object.
   *
   * @returns
   *        The built evolution.
   */
  public build(): IZEvolution {
    return structuredClone(this._evolution);
  }
}

import { IZResource } from '../resource/resource';
import { IZEvolutionNode, ZEvolutionNodeBuilder } from './evolution-node';

/**
 * Represents an evolution chain.
 */
export interface IZEvolution extends IZResource {
  /**
   * Represents the head node.
   */
  head: IZEvolutionNode;
}

export class ZEvolutionBuilder {
  private _evolution: IZEvolution;

  public constructor() {
    this._evolution = {
      id: 0,
      name: '0',
      head: new ZEvolutionNodeBuilder().build()
    };
  }

  /**
   * Sets the evolution name.
   *
   * @param id -
   *        The name id.
   *
   * @returns
   *        This object.
   */
  public id(id: number) {
    this._evolution.id = id;
    this._evolution.name = String(id);
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
    return this.id(140).head(new ZEvolutionNodeBuilder().ralts().build());
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

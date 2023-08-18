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
   * Sets the evolution chain that starts with feebas.
   * @returns
   *        This object.
   */
  public feebas() {
    return this.id(178).head(new ZEvolutionNodeBuilder().feebas().build());
  }

  /**
   * Sets the evolution chain that starts with eevee.
   *
   * @returns
   *        This object.
   */
  public eevee() {
    return this.id(67).head(new ZEvolutionNodeBuilder().eevee().build());
  }

  /**
   * Sets the evolution chain that starts with tangela.
   *
   * @returns
   *        This object.
   */
  public tangela() {
    return this.id(52).head(new ZEvolutionNodeBuilder().tangela().build());
  }

  /**
   * Sets the evolution chain that starts with mantyke.
   *
   * @returns
   *        This object.
   */
  public mantyke() {
    return this.id(116).head(new ZEvolutionNodeBuilder().mantyke().build());
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

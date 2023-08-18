import { IZEvolutionTrigger, ZEvolutionTrigger, ZEvolutionTriggerBuilder } from './evolution-trigger';

/**
 * Represents a node in an evolution chain.
 */
export interface IZEvolutionNode {
  /**
   * The name of the pokemon species involved at this level of the chain.
   */
  species: string;

  /**
   * The options for the next stage of evolution.  Will be empty
   * if this is the maximum level or if a pokemon species has
   * no evolution.
   */
  next: IZEvolutionNode[];

  /**
   * The triggers that cause the pokemon to evolve.
   *
   * All triggers must be true in order to trigger the evolution.
   * If this is empty, then it implies that there is no trigger for
   * evolution and the pokemon is simply caught in the wild.
   */
  triggers: IZEvolutionTrigger[];
}

export class ZEvolutionNodeBuilder {
  private _node: IZEvolutionNode;

  public constructor() {
    this._node = {
      next: [],
      triggers: [],
      species: 'missingno'
    };
  }

  /**
   * Sets the pokemon involved with the evolution.
   *
   * @param name -
   *        The name of the involved pokemon.
   *
   * @returns
   *        This object.
   */
  public species(name: string) {
    this._node.species = name;
    return this;
  }

  /**
   * Sets the possible next evolution options in the evolution phase.
   *
   * @param evolutions -
   *        The list of possible evolutions from this phase.
   *
   * @returns
   *        This object.
   */
  public next(phases: IZEvolutionNode[]) {
    this._node.next = phases;
    return this;
  }

  /**
   * Adds another possible evolution option.
   *
   * @param next -
   *        The option to add.
   *
   * @returns
   *        This object.
   */
  public option(next: IZEvolutionNode) {
    return this.next(this._node.next.concat([next]));
  }

  /**
   * Sets the triggers that must be met for the pokemon to evolve.
   *
   * @param triggers -
   *        The list of triggers.
   *
   * @returns
   *        This object.
   */
  public triggers(triggers: IZEvolutionTrigger[]) {
    this._node.triggers = triggers;
    return this;
  }

  /**
   * Constructs the evolution node for Ralts.
   *
   * @returns
   *        This object.
   */
  public ralts() {
    return this.species('ralts').option(new ZEvolutionNodeBuilder().kirlia().build());
  }

  /**
   * Constructs the evolution chain for Kirlia
   *
   * @returns
   *        This object.
   */
  public kirlia() {
    return this.species('kirlia')
      .option(new ZEvolutionNodeBuilder().gardevoir().build())
      .option(new ZEvolutionNodeBuilder().gallade().build())
      .trigger(new ZEvolutionTriggerBuilder().level(20).build());
  }

  /**
   * Constructs the evolution chain for Gardevoir.
   *
   * @returns
   *        This object.
   */
  public gardevoir() {
    return this.species('gardevoir').trigger(new ZEvolutionTriggerBuilder().level(30).build());
  }

  /**
   * Constructs the evolution chain for Gallade.
   *
   * @returns
   *        This object.
   */
  public gallade() {
    return this.species('gallade').trigger(new ZEvolutionTriggerBuilder().male().item('dawn-stone').build());
  }

  /**
   * Constructs the evolution chain for Feebas.
   *
   * @returns
   *        This object.
   */
  public feebas() {
    return this.species('feebas').option(new ZEvolutionNodeBuilder().milotic().build());
  }

  /**
   * Constructs the evolution chain for Milotic.
   *
   * @returns
   *        This object.
   */
  public milotic() {
    return this.species('milotic')
      .trigger(new ZEvolutionTriggerBuilder().name(ZEvolutionTrigger.LevelUp).beauty(171).build())
      .trigger(new ZEvolutionTriggerBuilder().name(ZEvolutionTrigger.Trade).held('prism-scale').build())
      .trigger(new ZEvolutionTriggerBuilder().name(ZEvolutionTrigger.LevelUp).beauty(170).build());
  }

  /**
   * Adds a trigger mechanism for evolution.
   *
   * @param trigger -
   *        The trigger mechanism to add.
   *
   * @returns
   *        This object.
   */
  public trigger(trigger: IZEvolutionTrigger) {
    return this.triggers(this._node.triggers.concat([trigger]));
  }

  /**
   * Builds the evolution object.
   *
   * @returns
   *        The built evolution.
   */
  public build(): IZEvolutionNode {
    return structuredClone(this._node);
  }
}

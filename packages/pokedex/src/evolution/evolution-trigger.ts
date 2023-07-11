import { ZGender } from '../gender/gender';
import { IZPokedexNamedResource } from '../resource/resource';

export enum ZEvolutionTrigger {
  AgileStyleMove = 'agile-style-move',
  LevelUp = 'level-up',
  Other = 'other',
  RecoilDamage = 'recoil-damage',
  Shed = 'shed',
  Spin = 'spin',
  StrongStyleMove = 'strong-style-move',
  TakeDamage = 'take-damage',
  ThreeCriticalHits = 'three-critical-hits',
  TowerOfDarkness = 'tower-of-darkness',
  TowerOfWaters = 'tower-of-waters',
  Trade = 'trade',
  UseItem = 'use-item'
}

export interface IZEvolutionTrigger extends IZPokedexNamedResource<ZEvolutionTrigger> {
  affection?: number;
  gender?: ZGender;
  happiness?: number;
  held?: string;
  item?: string;
  level?: number;
  location?: string;
  move?: string;
  moveType?: string;
  partySpecies?: string;
  partyType?: string;
  rain: boolean;
  stats?: string[];
  time?: string;
  trade?: string;
  turnUpsideDown: boolean;
}

export class ZEvolutionTriggerBuilder {
  private _trigger: IZEvolutionTrigger;

  public constructor() {
    this._trigger = {
      name: ZEvolutionTrigger.Other,
      rain: false,
      turnUpsideDown: false
    };
  }

  /**
   * Sets the overall trigger strategy for this evolution trigger.
   *
   * @param trigger -
   *        The trigger description.
   *
   * @returns
   *        This object.
   */
  public name(trigger: ZEvolutionTrigger) {
    this._trigger.name = trigger;
    return this;
  }

  /**
   * Sets a minimum affection requirement.
   *
   * @param affection -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public affection(affection: number) {
    this._trigger.affection = affection;
    return this;
  }

  /**
   * Sets a gender requirement.
   *
   * @param gender -
   *        The gender requirement.
   *
   * @returns
   *        This object.
   */
  public gender(gender: ZGender) {
    this._trigger.gender = gender;
    return this;
  }

  /**
   * Sets a male gender requirement.
   *
   * @returns
   *        This object.
   */
  public male = this.gender.bind(this, ZGender.Male);

  /**
   * Sets a female gender requirement.
   *
   * @returns
   *        This object.
   */
  public female = this.gender.bind(this, ZGender.Female);

  /**
   * Sets a genderless requirement.
   *
   * @returns
   *        This object.
   */
  public genderless = this.gender.bind(this, ZGender.Genderless);

  /**
   * Sets a minimum happiness requirement.
   *
   * @param happiness -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public happiness(happiness: number) {
    this._trigger.happiness = happiness;
    return this;
  }

  /**
   * Sets a held item requirement.
   *
   * @param item -
   *        The item to hold.
   *
   * @returns
   *        This object.
   */
  public held(held: string) {
    this._trigger.held = held;
    return this;
  }

  /**
   * Sets a item requirement.
   *
   * @param item -
   *        The item to use.
   *
   * @returns
   *        This object.
   */
  public item(item: string) {
    this._trigger.held = item;
    return this;
  }

  /**
   * Sets a move requirement.
   *
   * @param move -
   *        The move to know.
   *
   * @returns
   *        This object.
   */
  public move(move: string) {
    this._trigger.move = move;
    return this;
  }

  /**
   * Sets a move type requirement.
   *
   * @param type -
   *        The move type to know.
   *
   * @returns
   *        This object.
   */
  public moveType(type: string) {
    this._trigger.moveType = type;
    return this;
  }

  /**
   * Sets a level requirement.
   *
   * @param level -
   *        The level to reach.
   *
   * @returns
   *        This object.
   */
  public level(level: number) {
    this._trigger.level = level;
    return this;
  }

  /**
   * Sets a location requirement.
   *
   * @param location -
   *        The location to enter.
   *
   * @returns
   *        This object.
   */
  public location(location: string) {
    this._trigger.location = location;
    return this;
  }

  /**
   * Sets a party species requirement.
   *
   * @param species -
   *        The species requirement.
   *
   * @returns
   *        This object.
   */
  public partySpecies(species: string) {
    this._trigger.partySpecies = species;
    return this;
  }

  /**
   * Sets a party type requirement.
   *
   * @param type -
   *        The type requirement.
   *
   * @returns
   *        This object.
   */
  public partyType(type: string) {
    this._trigger.partyType = type;
    return this;
  }

  /**
   * Sets the weather requirement.
   *
   * @param rain -
   *        True to require rain, false otherwise.
   *
   * @returns
   *        This object.
   */
  public rain(rain = true) {
    this._trigger.rain = rain;
    return this;
  }

  /**
   * Sets the physical stats requirement.
   *
   * @param stats -
   *        The required stats.
   *
   * @returns
   *        This object.
   */
  public stats(stats: string[]) {
    this._trigger.stats = stats;
    return this;
  }

  /**
   * Adds a physical stats requirement.
   *
   * @param stat -
   *        The stat to add.
   *
   * @returns
   *        This object.
   */
  public stat(stat: string) {
    return this.stats((this._trigger.stats || []).concat([stat]));
  }

  /**
   * Sets the time of day requirement.
   *
   * @param time -
   *        The time of day requirement.
   *
   * @returns
   *        This object.
   */
  public time(time: string) {
    this._trigger.time = time;
    return this;
  }

  /**
   * Sets a trade requirement.
   *
   * @param trade -
   *        The species to trade.
   *
   * @returns
   *        This object.
   */
  public trade(species: string) {
    this._trigger.trade = species;
    return this;
  }

  /**
   * Sets the turn requirement.
   *
   * @param turn -
   *        True to require a turn, false otherwise.
   *
   * @returns
   *        This object.
   */
  public turnUpsideDown(turn = true) {
    this._trigger.turnUpsideDown = turn;
    return this;
  }

  /**
   * Builds the evolution trigger object.
   *
   * @returns
   *        A deep copy of the trigger object.
   */
  public build(): IZEvolutionTrigger {
    return structuredClone(this._trigger);
  }
}

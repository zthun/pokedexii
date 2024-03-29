import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZResource } from '../resource/resource';
import { ZType } from '../type/type';

/**
 * The maximum base stat a pokemon can have.
 */
export const ZPokemonMaxBaseStat = 255;

/**
 * A stat value
 */
export interface IZPokemonStat {
  /**
   * Base stat upon capture.
   */
  base: number;
  /**
   * Effort gain upon level up.
   */
  effort: number;
}

/**
 * A weakness of the pokemon to a specific type.
 */
export interface IZPokemonWeakness {
  /**
   * The type.
   */
  type: ZType;

  /**
   * The damage multiplier.
   */
  damage: 2 | 4;
}

/**
 * An ability for a pokemon.
 */
export interface IZPokemonAbility {
  /**
   * The ability name.
   */
  name: string;
  /**
   * Whether or not the ability is hidden.
   */
  hidden: boolean;
}

/**
 * Represents information about a pokemon variant.
 */
export interface IZPokemon extends IZResource {
  /**
   * The height of the pokemon in decimeters.
   */
  height: number;

  /**
   * The weight of the pokemon in hectograms.
   */
  weight: number;

  /**
   * The stat list for the pokemon.
   */
  stats: {
    hp: IZPokemonStat;
    attack: IZPokemonStat;
    defense: IZPokemonStat;
    specialAttack: IZPokemonStat;
    specialDefense: IZPokemonStat;
    speed: IZPokemonStat;
  };

  /**
   * The type weaknesses of this pokemon.
   */
  weaknesses: IZPokemonWeakness[];

  /**
   * The url for the pokemon artwork.
   */
  artwork?: string;

  /**
   * The types for this pokemon.
   */
  types: ZType[];

  /**
   * The abilities for this pokemon.
   */
  abilities: IZPokemonAbility[];
}

/**
 * Represents a builder for pokemon information.
 */
export class ZPokemonBuilder {
  private _pokemon: IZPokemon;

  /**
   * Initializes a new instance of this object.
   *
   * If you build directly after an invocation to this
   * constructor, you will be left with missingno.
   *
   * https://bulbapedia.bulbagarden.net/wiki/MissingNo
   */
  public constructor() {
    this._pokemon = {
      id: 0,
      name: 'missingno',
      height: 0,
      weight: 0,
      stats: {
        hp: { base: 0, effort: 0 },
        attack: { base: 0, effort: 0 },
        defense: { base: 0, effort: 0 },
        specialAttack: { base: 0, effort: 0 },
        specialDefense: { base: 0, effort: 0 },
        speed: { base: 0, effort: 0 }
      },
      types: [],
      weaknesses: [],
      abilities: []
    };
  }

  /**
   * Who's that pokemon? Sets the national id.
   *
   * This will also set the default value for the artwork
   * given some major assumptions.  This value may not always
   * be correct for the artwork, but you can use it for demos
   * and test cases assuming that it continues to be valid.
   *
   * @param id -
   *        The national id of the pokemon.
   *
   * @returns
   *        A reference to this object.
   */
  public id(id: number): this {
    this._pokemon.id = id;
    return this.art(id);
  }

  /**
   * Sets the name of the pokemon.
   */
  public name(name: string): this {
    this._pokemon.name = name;
    return this;
  }

  /**
   * Sets the url for the pokemon artwork.
   *
   * @param artwork -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public artwork(artwork: string): this {
    this._pokemon.artwork = artwork;
    return this;
  }

  /**
   * Builds the artwork from the standard github content.
   *
   * @param id -
   *        The id number of the pokemon.
   *
   * @returns
   *        This object.
   */
  public art(id: number): this {
    const url = new ZUrlBuilder('https', 'raw.githubusercontent.com')
      .append('PokeAPI')
      .append('sprites')
      .append('master')
      .append('sprites')
      .append('pokemon')
      .append('other')
      .append('official-artwork')
      .append(`${id}.png`)
      .build();

    return this.artwork(url);
  }

  /**
   * Sets the pokemon types.
   *
   * @param types -
   *        The types to set.
   *
   * @returns
   *        This object.
   */
  public types(types: ZType[]) {
    this._pokemon.types = types;
    return this;
  }

  /**
   * Adds an individual type.
   *
   * @param type -
   *        The type to add.
   *
   * @returns
   *        This object.
   */
  public type(type: ZType) {
    return this.types([...this._pokemon.types, type]);
  }

  /**
   * Sets the list of weaknesses.
   *
   * @param weaknesses -
   *        The weaknesses to set.
   *
   * @returns
   *        This object.
   */
  public weaknesses(weaknesses: IZPokemonWeakness[]) {
    this._pokemon.weaknesses = weaknesses;
    return this;
  }

  /**
   * Adds a weakness.
   *
   * @param weakness -
   *        The weakness to add.
   *
   * @returns
   *        This object.
   */
  public weakness(weakness: IZPokemonWeakness) {
    return this.weaknesses(this._pokemon.weaknesses.concat(weakness));
  }

  /**
   * Sets the list of pokemon abilities.
   *
   * @param abilities -
   *        The abilities to set.
   *
   * @returns
   *        This object.
   */
  public abilities(abilities: IZPokemonAbility[]) {
    this._pokemon.abilities = abilities;
    return this;
  }

  /**
   * Adds an ability.
   *
   * @param ability -
   *        The name of the ability.
   * @param hidden -
   *        Whether or not the ability is hidden.
   *
   * @returns
   *        This object.
   */
  public ability(ability: string, hidden = false) {
    return this.abilities(this._pokemon.abilities.concat({ name: ability, hidden }));
  }

  /**
   * Adds a 2x weakness.
   *
   * @param type -
   *        The type to add the weakness from.
   *
   * @returns
   *        This object.
   */
  public doubleDamageFrom(type: ZType) {
    return this.weakness({ type, damage: 2 });
  }

  /**
   * Adds a 4x weakness.
   *
   * @param type -
   *        The type to add the weakness from.
   *
   * @returns
   *        This object.
   */
  public quadrupleDamageFrom(type: ZType) {
    return this.weakness({ type, damage: 4 });
  }

  /**
   * Sets the hp stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public hp(base: number, effort = 0) {
    this._pokemon.stats.hp = { base, effort };
    return this;
  }

  /**
   * Sets the attack stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public attack(base: number, effort = 0) {
    this._pokemon.stats.attack = { base, effort };
    return this;
  }

  /**
   * Sets the defense stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public defense(base: number, effort = 0) {
    this._pokemon.stats.defense = { base, effort };
    return this;
  }

  /**
   * Sets the special attack stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public specialAttack(base: number, effort = 0) {
    this._pokemon.stats.specialAttack = { base, effort };
    return this;
  }

  /**
   * Sets the special defense stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public specialDefense(base: number, effort = 0) {
    this._pokemon.stats.specialDefense = { base, effort };
    return this;
  }

  /**
   * Sets the speed stats for the pokemon.
   *
   * @param base -
   *        The base stat value.
   * @param effort -
   *        The default effort stat.
   *
   * @returns
   *        This object.
   */
  public speed(base: number, effort = 0) {
    this._pokemon.stats.speed = { base, effort };
    return this;
  }

  /**
   * Sets the height of the pokemon in decimeters.
   *
   * @param val -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public height(val: number) {
    this._pokemon.height = val;
    return this;
  }

  /**
   * Sets the weight of the pokemon in hectograms.
   *
   * @param val -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public weight(val: number) {
    this._pokemon.weight = val;
    return this;
  }

  /**
   * Sets Bulbasaur's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public bulbasaur() {
    return this.id(1)
      .name('bulbasaur')
      .type(ZType.Grass)
      .type(ZType.Poison)
      .ability('overgrow')
      .ability('chlorophyll', true)
      .doubleDamageFrom(ZType.Fire)
      .doubleDamageFrom(ZType.Flying)
      .doubleDamageFrom(ZType.Ice)
      .doubleDamageFrom(ZType.Psychic)
      .hp(45)
      .attack(49)
      .defense(49)
      .specialAttack(65, 1)
      .specialDefense(65)
      .speed(45)
      .height(7)
      .weight(69);
  }

  /**
   * Sets Charmander's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charmander() {
    return this.id(4)
      .name('charmander')
      .type(ZType.Fire)
      .ability('blaze')
      .ability('solar-power', true)
      .doubleDamageFrom(ZType.Ground)
      .doubleDamageFrom(ZType.Rock)
      .doubleDamageFrom(ZType.Water)
      .hp(39)
      .attack(52)
      .defense(43)
      .specialAttack(60)
      .specialDefense(50)
      .speed(65, 1)
      .height(6)
      .weight(85);
  }

  /**
   * Sets Charizard's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charizard() {
    return this.id(6)
      .name('charizard')
      .type(ZType.Fire)
      .type(ZType.Flying)
      .ability('blaze')
      .ability('solar-power', true)
      .doubleDamageFrom(ZType.Electric)
      .quadrupleDamageFrom(ZType.Rock)
      .doubleDamageFrom(ZType.Water)
      .hp(78)
      .attack(84)
      .defense(78)
      .specialAttack(109, 3)
      .specialDefense(85)
      .speed(100)
      .height(17)
      .weight(905);
  }

  /**
   * Sets Charizard's Mega X variant information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charizardMegaX() {
    return this.id(10034)
      .name('charizard-mega-x')
      .type(ZType.Fire)
      .type(ZType.Dragon)
      .ability('tough-claws')
      .doubleDamageFrom(ZType.Dragon)
      .doubleDamageFrom(ZType.Ground)
      .doubleDamageFrom(ZType.Rock)
      .hp(78)
      .attack(130)
      .defense(111)
      .specialAttack(130)
      .specialDefense(85)
      .speed(100)
      .height(17)
      .weight(1105);
  }

  /**
   * Sets Charizard's Mega X variant information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charizardMegaY() {
    return this.id(10035)
      .name('charizard-mega-y')
      .type(ZType.Fire)
      .type(ZType.Flying)
      .ability('drought')
      .doubleDamageFrom(ZType.Electric)
      .quadrupleDamageFrom(ZType.Rock)
      .doubleDamageFrom(ZType.Water)
      .hp(78)
      .attack(104)
      .defense(78)
      .specialAttack(159)
      .specialDefense(115)
      .speed(100)
      .height(17)
      .weight(1005);
  }

  /**
   * Sets Charizard's Mega X variant information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public charizardGMax() {
    return this.id(10035)
      .name('charizard-mega-y')
      .type(ZType.Fire)
      .type(ZType.Flying)
      .ability('blaze')
      .ability('solar-power', true)
      .doubleDamageFrom(ZType.Electric)
      .quadrupleDamageFrom(ZType.Rock)
      .doubleDamageFrom(ZType.Water)
      .hp(78)
      .attack(84)
      .defense(78)
      .specialAttack(109)
      .specialDefense(85)
      .speed(100)
      .height(280)
      .weight(10000);
  }

  /**
   * Sets Squirtle's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public squirtle() {
    return this.id(7)
      .name('squirtle')
      .type(ZType.Water)
      .ability('torrent')
      .ability('rain-dish', true)
      .doubleDamageFrom(ZType.Electric)
      .doubleDamageFrom(ZType.Grass)
      .hp(44)
      .attack(48)
      .defense(65, 1)
      .specialAttack(50)
      .specialDefense(64)
      .speed(43)
      .height(5)
      .weight(90);
  }

  /**
   * Sets Pikachu's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public pikachu() {
    return this.id(25)
      .name('pikachu')
      .type(ZType.Electric)
      .ability('static')
      .ability('lightning-rod', true)
      .doubleDamageFrom(ZType.Ground)
      .hp(35)
      .attack(55)
      .defense(40)
      .specialAttack(50)
      .specialDefense(50)
      .speed(90, 2)
      .height(4)
      .weight(60);
  }

  /**
   * Sets Ralts's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public ralts() {
    return this.id(280)
      .name('ralts')
      .type(ZType.Psychic)
      .type(ZType.Fairy)
      .ability('synchronize')
      .ability('trace')
      .ability('telepathy', true)
      .doubleDamageFrom(ZType.Ghost)
      .doubleDamageFrom(ZType.Poison)
      .doubleDamageFrom(ZType.Steel)
      .hp(28)
      .attack(25)
      .defense(25)
      .specialAttack(45)
      .specialDefense(35)
      .speed(40)
      .height(4)
      .weight(66);
  }

  /**
   * Sets Kirlia's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public kirlia() {
    return this.id(281)
      .name('kirlia')
      .type(ZType.Psychic)
      .type(ZType.Fairy)
      .ability('synchronize')
      .ability('trace')
      .ability('telepathy', true)
      .doubleDamageFrom(ZType.Ghost)
      .doubleDamageFrom(ZType.Poison)
      .doubleDamageFrom(ZType.Steel)
      .hp(38)
      .attack(25)
      .defense(35)
      .specialAttack(65)
      .specialDefense(55)
      .speed(50)
      .height(4)
      .weight(66);
  }

  /**
   * Sets Gardevoir's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public gardevoir() {
    return this.id(282)
      .name('gardevoir')
      .type(ZType.Psychic)
      .type(ZType.Fairy)
      .ability('synchronize')
      .ability('trace')
      .ability('telepathy', true)
      .doubleDamageFrom(ZType.Ghost)
      .doubleDamageFrom(ZType.Poison)
      .doubleDamageFrom(ZType.Steel)
      .hp(68)
      .attack(65)
      .defense(65)
      .specialAttack(125)
      .specialDefense(115)
      .speed(80)
      .height(16)
      .weight(484);
  }

  /**
   * Sets Gallade's information.
   *
   * It's better to retrieve this from something like the pokeapi,
   * but this just sets limited information which is good for
   * testing and demos.
   *
   * @returns
   *        A reference to this object.
   */
  public gallade() {
    return this.id(475)
      .name('gallade')
      .type(ZType.Psychic)
      .type(ZType.Fighting)
      .ability('steadfast')
      .ability('sharpness')
      .ability('justified', true)
      .doubleDamageFrom(ZType.Fairy)
      .doubleDamageFrom(ZType.Flying)
      .doubleDamageFrom(ZType.Ghost)
      .hp(68)
      .attack(125)
      .defense(65)
      .specialAttack(65)
      .specialDefense(115)
      .speed(80)
      .height(16)
      .weight(520);
  }

  /**
   * Returns a deep copy of the built pokemon.
   *
   * @returns
   *        A deep copy of the built pokemon.
   */
  public build(): IZPokemon {
    return JSON.parse(JSON.stringify(this._pokemon));
  }
}

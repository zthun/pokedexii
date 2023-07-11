import { IZNamedResource } from '../resource/resource';

/**
 * Represents a species of pokemon.
 *
 * A pokemon species is the root of the pokemon hierarchy.
 */
export interface IZSpecies extends IZNamedResource {
  /**
   * The national id of the pokemon species.
   */
  id: number;
  /**
   * The base happiness.
   */
  happiness: number;
  /**
   * The capture rate.
   */
  capture: number;
  /**
   * The id of the evolution chain for the species.
   */
  evolution: number;
  /**
   * The pokemon variants included in the species.
   */
  varieties: string[];
  /**
   * The default variety of pokemon that represents the species.
   */
  main: string;
}

export class ZSpeciesBuilder {
  private _species: IZSpecies;

  public constructor() {
    this._species = {
      id: 0,
      name: 'missingno',
      happiness: 0,
      capture: 0,
      evolution: 0,
      varieties: [],
      main: 'missingno'
    };
  }

  public id(id: number) {
    this._species.id = id;
    return this;
  }

  public name(name: string) {
    this._species.name = name;
    return this;
  }

  public happiness(val: number) {
    this._species.happiness = val;
    return this;
  }

  public capture(val: number) {
    this._species.capture = val;
    return this;
  }

  public evolution(id: number) {
    this._species.evolution = id;
    return this;
  }

  public varieties(varieties: string[]) {
    this._species.varieties = varieties;
    return this;
  }

  public variety(variety: string, main = false) {
    const species = this.varieties(this._species.varieties.concat([variety]));
    return main ? species.main(variety) : species;
  }

  public main(variety: string) {
    this._species.main = variety;
    return this;
  }

  public urshifu() {
    return this.name('urshifu')
      .id(892)
      .happiness(50)
      .capture(3)
      .evolution(470)
      .variety('urshifu-single-strike', true)
      .variety('urshifu-rapid-strike')
      .variety('urshifu-single-strike-gmax')
      .variety('urshifu-rapid-strike-gmax');
  }

  public bulbasaur() {
    return this.name('bulbasaur').id(1).happiness(50).capture(45).evolution(1).variety('bulbasaur', true);
  }

  public charmander() {
    return this.name('charmander').id(4).happiness(50).capture(45).evolution(2).variety('charmander', true);
  }

  public squirtle() {
    return this.name('squirtle').id(7).happiness(50).capture(45).evolution(3).variety('squirtle', true);
  }

  public pikachu() {
    return this.name('pikachu')
      .id(25)
      .happiness(50)
      .capture(190)
      .evolution(10)
      .variety('pikachu', true)
      .variety('pikachu-rock-star')
      .variety('pikachu-belle')
      .variety('pikachu-pop-star')
      .variety('pikachu-phd')
      .variety('pikachu-phd')
      .variety('pikachu-libre')
      .variety('pikachu-cosplay')
      .variety('pikachu-original-cap')
      .variety('pikachu-hoenn-cap')
      .variety('pikachu-sinnoh-cap')
      .variety('pikachu-unova-cap')
      .variety('pikachu-kalos-cap')
      .variety('pikachu-alola-cap')
      .variety('pikachu-partner-cap')
      .variety('pikachu-starter')
      .variety('pikachu-world-cap')
      .variety('pikachu-gmax');
  }

  public build() {
    return structuredClone(this._species);
  }
}

import { IZPokemon, ZPokemonBuilder } from '../pokemon/pokemon';
import { IZResource } from '../resource/resource';
import { ZType } from '../type/type';

/**
 * Represents a species of pokemon.
 *
 * A pokemon species is the root of the pokemon hierarchy.
 */
export interface IZSpecies extends IZResource {
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
  /**
   * The artwork for the species from the main type.
   */
  artwork?: string;
  /**
   * The types of the main variant of the species.
   */
  types: ZType[];
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
      main: 'missingno',
      types: []
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

  public main(pokemon: string | IZPokemon) {
    const variety = typeof pokemon === 'string' ? pokemon : pokemon.name;
    this._species.main = variety;
    return typeof pokemon === 'object' ? this.artwork(pokemon.artwork).types(pokemon.types) : this;
  }

  public artwork(artwork?: string) {
    this._species.artwork = artwork;
    return this;
  }

  public types(types: ZType[]) {
    this._species.types = types;
    return this;
  }

  public bulbasaur() {
    return this.name('bulbasaur')
      .id(1)
      .happiness(50)
      .capture(45)
      .evolution(1)
      .variety('bulbasaur')
      .main(new ZPokemonBuilder().bulbasaur().build());
  }

  public charmander() {
    return this.name('charmander')
      .id(4)
      .happiness(50)
      .capture(45)
      .evolution(2)
      .variety('charmander')
      .main(new ZPokemonBuilder().charmander().build());
  }

  public charizard() {
    return this.name('charizard')
      .id(6)
      .happiness(50)
      .capture(45)
      .evolution(2)
      .variety('charizard')
      .variety('charizard-mega-x')
      .variety('charizard-mega-y')
      .variety('charizard-gmax')
      .main(new ZPokemonBuilder().charizard().build());
  }

  public squirtle() {
    return this.name('squirtle')
      .id(7)
      .happiness(50)
      .capture(45)
      .evolution(3)
      .variety('squirtle')
      .main(new ZPokemonBuilder().squirtle().build());
  }

  public pikachu() {
    return this.name('pikachu')
      .id(25)
      .happiness(50)
      .capture(190)
      .evolution(10)
      .variety('pikachu')
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
      .variety('pikachu-gmax')
      .main(new ZPokemonBuilder().pikachu().build());
  }

  public ralts() {
    return this.name('ralts')
      .id(280)
      .happiness(35)
      .capture(235)
      .evolution(140)
      .variety('ralts')
      .main(new ZPokemonBuilder().ralts().build());
  }

  public kirlia() {
    return this.name('kirlia')
      .id(281)
      .happiness(35)
      .capture(120)
      .evolution(140)
      .variety('kirlia')
      .main(new ZPokemonBuilder().kirlia().build());
  }

  public gardevoir() {
    return this.name('gardevoir')
      .id(282)
      .happiness(35)
      .capture(45)
      .evolution(140)
      .variety('gardevoir')
      .variety('gardevoir-mega')
      .main(new ZPokemonBuilder().gardevoir().build());
  }

  public gallade() {
    return this.name('gallade')
      .id(475)
      .happiness(35)
      .capture(45)
      .evolution(140)
      .variety('gallade')
      .variety('gallade-mega')
      .main(new ZPokemonBuilder().gallade().build());
  }

  public build() {
    return structuredClone(this._species);
  }
}

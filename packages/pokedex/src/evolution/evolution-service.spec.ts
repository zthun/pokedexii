import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { keyBy } from 'lodash';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZGender } from '../gender/gender';
import { IPokeApi } from '../poke-api/poke-api';
import {
  IPokeApiEvolutionChain,
  IPokeApiEvolutionChainDetails,
  IPokeApiEvolutionChainLink
} from '../poke-api/poke-api-evolution-chain';
import { createApiPage } from '../poke-api/poke-api-page';
import { createResource } from '../poke-api/poke-api-resource';
import { IZSpecies, ZSpeciesBuilder } from '../species/species';
import { IZEvolution, ZEvolutionBuilder } from './evolution';
import { IZEvolutionNode } from './evolution-node';
import { createEvolutionService } from './evolution-service';
import { IZEvolutionTrigger, ZEvolutionTriggerBuilder } from './evolution-trigger';

describe('ZEvolutionService', () => {
  const genders = Object.values(ZGender);
  let api: Mocked<IPokeApi>;
  let ralts: IZEvolution;
  let species: Record<string, IZSpecies>;

  const createTestTarget = () => createEvolutionService(api);

  const createApiEvolutionDetails = (node: IZEvolutionTrigger): IPokeApiEvolutionChainDetails => {
    const gender = node.gender ? genders.indexOf(node.gender) + 1 : null;
    const held_item = node.held ? createResource('item', 0, node.held) : null;
    const item = node.item ? createResource('item', 0, node.item) : null;
    const known_move = node.move ? createResource('move', 0, node.move) : null;
    const known_move_type = node.moveType ? createResource('move-type', 0, node.moveType) : null;
    const location = node.location ? createResource('location', 0, node.location) : null;
    const min_affection = node.affection ?? null;
    const min_beauty = node.beauty ?? null;
    const min_happiness = node.happiness ?? null;
    const min_level = node.level ?? null;
    const needs_overworld_rain = node.rain;
    const party_species = node.partySpecies ? createResource('species', 0, node.partySpecies) : null;
    const party_type = node.partyType ? createResource('type', 0, node.partyType) : null;
    const relative_physical_stats = node.stats ? node.stats.map((s) => createResource('stat', 0, s)) : null;
    const time_of_day = node.time || '';
    const trade_species = node.trade ? createResource('species', 0, node.trade) : null;
    const trigger = createResource('evolution-trigger', 0, node.name);
    const turn_upside_down = node.turnUpsideDown;

    return {
      gender,
      held_item,
      item,
      known_move,
      known_move_type,
      location,
      min_affection,
      min_beauty,
      min_happiness,
      min_level,
      needs_overworld_rain,
      party_species,
      party_type,
      relative_physical_stats,
      time_of_day,
      trade_species,
      trigger,
      turn_upside_down
    };
  };

  const createApiEvolutionChain = (node: IZEvolutionNode): IPokeApiEvolutionChainLink => ({
    evolution_details: node.triggers.map(createApiEvolutionDetails),
    evolves_to: node.next.map(createApiEvolutionChain),
    is_baby: false,
    species: createResource('pokemon-species', species[node.species].id, node.species)
  });

  const createApiEvolution = (evolution: IZEvolution): IPokeApiEvolutionChain => ({
    baby_trigger_item: null,
    chain: createApiEvolutionChain(evolution.head),
    id: evolution.id
  });

  beforeEach(() => {
    ralts = new ZEvolutionBuilder().ralts().build();

    const ralts$ = new ZSpeciesBuilder().ralts().build();
    const kirlia$ = new ZSpeciesBuilder().kirlia().build();
    const gardevoir$ = new ZSpeciesBuilder().gardevoir().build();
    const gallade$ = new ZSpeciesBuilder().gallade().build();

    const _species = [ralts$, kirlia$, gardevoir$, gallade$];
    species = keyBy(_species, (s) => s.name);

    const _ralts = createApiEvolution(ralts);
    const _evolutionPage = createApiPage('pokemon', [ralts]);

    api = mock<IPokeApi>();

    api.evolutionList.mockResolvedValue(_evolutionPage);
    api.evolution.mockResolvedValue(_ralts);
  });

  it('should retrieve all evolutions', async () => {
    const request = new ZDataRequestBuilder().build();
    const actual = await createTestTarget().retrieve(request);
    expect(actual).toEqual([{ id: ralts.id, name: ralts.name }]);
  });

  it('should set the id', async () => {
    const actual = (await createTestTarget().get(ralts.name)).id;
    expect(actual).toEqual(ralts.id);
  });

  it('should set the name', async () => {
    const actual = (await createTestTarget().get(ralts.name)).name;
    expect(actual).toEqual(ralts.name);
  });

  it('should set the chain', async () => {
    const actual = (await createTestTarget().get(ralts.name)).head;
    expect(actual).toEqual(ralts.head);
  });

  describe('Triggers', () => {
    const shouldSetTrigger = async (expected: IZEvolutionTrigger) => {
      // Arrange.
      ralts.head.triggers = [expected];
      api.evolution.mockResolvedValue(createApiEvolution(ralts));
      const target = createTestTarget();
      // Act.
      const ralts$$ = await target.get(ralts.name);
      const actual = ralts$$.head.triggers.at(0)!;
      // Assert.
      expect(actual).toEqual(expected);
    };

    it('should set the gender requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().genderless().build());
    });

    it('should set the held item requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().held('dawn-stone').build());
    });

    it('should set the item requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().item('some-stone').build());
    });

    it('should set the known move requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().move('kick').build());
    });

    it('should set the known move type requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().moveType('fighting').build());
    });

    it('should set the location requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().location('kanto').build());
    });

    it('should set the affection requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().affection(100).build());
    });

    it('should set the beauty requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().beauty(75).build());
    });

    it('should set the happiness requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().happiness(64).build());
    });

    it('should set the level requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().level(20).build());
    });

    it('should set the rain requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().rain().build());
    });

    it('should set the party species requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().partySpecies('ralts').build());
    });

    it('should set the party type requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().partyType('fire').build());
    });

    it('should set the relative physical stats requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().stat('hp').stat('attack').build());
    });

    it('should set the time of day requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().time('morning').build());
    });

    it('should set the trade species requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().trade('ralts').build());
    });

    it('should set the turn upside down requirement', async () => {
      await shouldSetTrigger(new ZEvolutionTriggerBuilder().turnUpsideDown().build());
    });
  });
});

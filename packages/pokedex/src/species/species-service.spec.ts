import { ZDataRequestBuilder } from '@zthun/helpful-query';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { IPokeApi } from '../poke-api/poke-api';
import { createApiPage } from '../poke-api/poke-api-page';
import { IPokeApiSpecies } from '../poke-api/poke-api-species';
import { IZSpecies, ZSpeciesBuilder } from './species';
import { createSpeciesService } from './species-service';

describe('ZSpeciesService', () => {
  let api: Mocked<IPokeApi>;
  let urshifu: IZSpecies;

  const createTestTarget = () => createSpeciesService(api);

  const createApiSpecies = (species: IZSpecies): IPokeApiSpecies => ({
    base_happiness: species.happiness,
    capture_rate: species.capture,
    color: { name: 'blue', url: '' },
    egg_groups: [],
    evolution_chain: { url: `https://pokeapi.co/evolution-chain/${species.evolution}` },
    evolves_from_species: { name: '', url: '' },
    flavor_text_entries: [],
    form_descriptions: [],
    forms_switchable: true,
    gender_rate: 1,
    genera: [],
    generation: { name: '', url: '' },
    growth_rate: { name: '', url: '' },
    habitat: { name: '', url: '' },
    has_gender_differences: false,
    hatch_counter: 0,
    id: species.id,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    name: species.name,
    names: [],
    order: 0,
    pal_park_encounters: [],
    pokedex_numbers: [],
    shape: { name: '', url: '' },
    varieties: species.varieties.map((s) => ({ is_default: species.main === s, pokemon: { name: s, url: '' } }))
  });

  beforeEach(() => {
    urshifu = new ZSpeciesBuilder().urshifu().build();

    const _urshifu = createApiSpecies(urshifu);
    const _speciesPage = createApiPage('species', [urshifu]);

    api = mock<IPokeApi>();

    api.speciesList.mockResolvedValue(_speciesPage);
    api.species.mockResolvedValue(_urshifu);
  });

  it('should retrieve all species', async () => {
    const request = new ZDataRequestBuilder().build();
    const actual = await createTestTarget().retrieve(request);
    expect(actual).toEqual([{ id: urshifu.id, name: urshifu.name }]);
  });

  it('should set the id', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).id;
    expect(actual).toEqual(urshifu.id);
  });

  it('should set the name', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).name;
    expect(actual).toEqual(urshifu.name);
  });

  it('should set the happiness', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).happiness;
    expect(actual).toEqual(urshifu.happiness);
  });

  it('should set the capture rate', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).capture;
    expect(actual).toEqual(urshifu.capture);
  });

  it('should set the evolution id', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).evolution;
    expect(actual).toEqual(urshifu.evolution);
  });

  it('should set the varieties', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).varieties;
    expect(actual).toEqual(urshifu.varieties);
  });

  it('should set the main variety', async () => {
    const actual = (await createTestTarget().get(urshifu.name)).main;
    expect(actual).toEqual(urshifu.main);
  });
});

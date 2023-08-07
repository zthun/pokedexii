import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZFashionThemeContext } from '@zthun/fashion-boutique';
import { ZDataRequestBuilder, ZDataSourceStatic, ZFilterBinaryBuilder } from '@zthun/helpful-query';
import { IZType, IZTypeService, ZType, ZTypeBuilder } from '@zthun/pokedex';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { createPokemonTheme } from '../theme/pokemon-theme';
import { ZTypeListPage } from './type-list-page';
import { ZTypeListPageComponentModel } from './type-list-page.cm';
import { ZTypeServiceContext } from './type-service';

describe('ZTypeListPage', () => {
  let fire: IZType;
  let flying: IZType;
  let ground: IZType;
  let types: IZType[];

  let typeService: Mocked<IZTypeService>;

  const createTestTarget = async () => {
    const element = (
      <ZFashionThemeContext.Provider value={createPokemonTheme()}>
        <ZTypeServiceContext.Provider value={typeService}>
          <ZTypeListPage />
        </ZTypeServiceContext.Provider>
      </ZFashionThemeContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    const _target = await ZCircusBy.first(driver, ZTypeListPageComponentModel);
    (await _target.grid()).load();
    return _target;
  };

  beforeEach(() => {
    fire = new ZTypeBuilder().fire().build();
    flying = new ZTypeBuilder().flying().build();
    ground = new ZTypeBuilder().ground().build();
    types = [fire, flying, ground];

    const source = new ZDataSourceStatic(types);

    typeService = mock();
    typeService.retrieve.mockImplementation((r) => source.retrieve(r));
    typeService.count.mockImplementation((r) => source.count(r));
    typeService.get.mockImplementation(async (t) => {
      const filter = new ZFilterBinaryBuilder().subject('name').equal().value(t).build();
      const request = new ZDataRequestBuilder().filter(filter).size(1).build();
      const [result] = await source.retrieve(request);
      return result;
    });
  });

  it('should render all types', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const cards = await target.cards();
    const _fire = await target.card(fire.name);
    const _flying = await target.card(flying.name);
    const _ground = await target.card(ground.name);
    await _fire?.asResourceCard().load();
    await _flying?.asResourceCard().load();
    await _ground?.asResourceCard().load();
    const __fire = await _fire?.type();
    const __flying = await _flying?.type();
    const __ground = await _ground?.type();
    // Assert.
    expect(cards.length).toEqual(types.length);
    expect(__fire).toEqual(ZType.Fire);
    expect(__flying).toEqual(ZType.Flying);
    expect(__ground).toEqual(ZType.Ground);
  });
});

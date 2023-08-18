import { ZGridView } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZDataRequestBuilder, ZSortBuilder } from '@zthun/helpful-query';
import { IZType } from '@zthun/pokedex';
import React, { useState } from 'react';
import { ZTypeCard } from './type-card';
import { useTypeService } from './type-service';

const DefaultRequest = new ZDataRequestBuilder().sort(new ZSortBuilder().ascending('name').build()).build();

export function ZTypeListPage() {
  const service = useTypeService();
  const [template, setTemplate] = useState(DefaultRequest);

  const renderType = (t: IZType) => <ZTypeCard key={t.name} type={t} />;

  return (
    <ZGridView
      className='ZTypeListPage-root'
      GridProps={{
        gap: ZSizeFixed.Small,
        columns: '1fr 1fr 1fr 1fr',
        columnsLg: '1fr 1fr 1fr',
        columnsMd: '1fr 1fr',
        columnsSm: '1fr'
      }}
      dataSource={service}
      renderItem={renderType}
      value={template}
      onValueChange={setTemplate}
    />
  );
}

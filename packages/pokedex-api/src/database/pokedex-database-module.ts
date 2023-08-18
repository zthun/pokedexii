import { Module } from '@nestjs/common';
import { ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { ZDatabaseMongo } from '@zthun/dalmart-mongo';
import { env } from 'process';
import { ZDatabaseToken } from './pokedex-database';

@Module({
  providers: [
    {
      provide: ZDatabaseToken,
      useValue: new ZDatabaseMongo(
        new ZDatabaseOptionsBuilder()
          .database('pokedex')
          .url(env.DATABASE_URL || 'mongodb://pokedex-mongo')
          .build()
      )
    }
  ],
  exports: [ZDatabaseToken]
})
export class ZPokedexDatabaseModule {}

import { Module } from '@nestjs/common';
import { ZDatabaseOptionsBuilder } from '@zthun/dalmart-db';
import { ZDatabaseMongo } from '@zthun/dalmart-mongo';
import { env } from 'process';
import { ZPokedexDatabaseName, ZPokedexDatabaseToken } from './pokedex-database';

@Module({
  providers: [
    {
      provide: ZPokedexDatabaseToken,
      useValue: new ZDatabaseMongo(
        new ZDatabaseOptionsBuilder()
          .database(ZPokedexDatabaseName)
          .url(env.DATABASE_URL || 'mongodb://pokedex-mongo')
          .build()
      )
    }
  ],
  exports: [ZPokedexDatabaseToken]
})
export class ZPokedexDatabaseModule {}

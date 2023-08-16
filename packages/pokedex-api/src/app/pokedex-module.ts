/* istanbul ignore file -- @preserve */
import { Module } from '@nestjs/common';
import { ZPokedexSpeciesModule } from '../species/species-module';

@Module({
  imports: [ZPokedexSpeciesModule]
})
export class ZPokedexModule {}

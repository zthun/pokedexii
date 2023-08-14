import { Module } from '@nestjs/common';
import { ZSpeciesController } from '../species/species-controller';

@Module({
  controllers: [ZSpeciesController]
})
export class ZPokedexModule {}

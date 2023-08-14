import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZPokedexModule } from './app/pokedex-module';

(async function () {
  const app = await NestFactory.create(ZPokedexModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pokedexxi API')
    .setDescription('The API for Pokedexxi')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
})();

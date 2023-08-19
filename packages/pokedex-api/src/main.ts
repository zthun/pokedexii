import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ZPokedexModule } from './app/pokedex-module';

(async function () {
  const app = await NestFactory.create(ZPokedexModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pokedexii API')
    .setDescription('The API for Pokedexii')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.use(helmet());

  await app.listen(3000);
})();

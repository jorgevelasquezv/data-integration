import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NotFoundFilter } from './filters/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PREFIX = '/api';

  const logger = new Logger('bootstrap');

  app.setGlobalPrefix(PREFIX);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Teslo Rest Full API')
    .setDescription('The Teslo Shop API endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(PREFIX + '/doc', app, document);

  app.useGlobalFilters(new NotFoundFilter());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  logger.log(`Server started on port: ${PORT}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const configService = app.get(ConfigService);

  const swaggerTitle = configService.get<string>(
    'SWAGGER_DOCS_TITLE',
    'Payroll Management API',
  );
  const swaggerDescription = configService.get<string>(
    'SWAGGER_DOCS_DESCRIPTION',
    'API documentation',
  );
  const swaggerVersion = configService.get<string>(
    'SWAGGER_DOCS_VERSION',
    '1.0',
  );
  const swaggerPath = configService.get<string>(
    'SWAGGER_DOCS_PATH',
    '/swagger',
  );

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());
  app.enableCors();

  await app.listen(configService.get<number>('PORT', 3000));
}
bootstrap();

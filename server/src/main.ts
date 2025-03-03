import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Servir archivos estáticos de la carpeta uploads
  app.use('/photos/uploads', express.static(join(__dirname, '..', 'photos/uploads')));
  // Ruta pública para imágenes
  await app.listen(3000);
}
bootstrap();

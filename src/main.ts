import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(8000);

  const port = Number(process.env.PORT) || 8000;
  await app.listen(port, '0.0.0.0')
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './shared/models/relations.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await sequelize.sync();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

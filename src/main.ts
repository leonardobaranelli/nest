import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from '../sequelize.config'; 

async function bootstrap() {
  await sequelize.sync();  

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
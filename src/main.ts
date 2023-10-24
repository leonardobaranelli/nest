import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './shared/models/relations.config'; 

async function bootstrap() {
  await sequelize.sync();  

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
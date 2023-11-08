import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'https://pf-nest-front.vercel.app/', // Frontend url //
    //origin: 'https://nest-frontend-pearl.vercel.app', // Frontend url //
    //origin: 'http://localhost:3000',    
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  const sequelize = app.get(Sequelize);
  await sequelize.sync({ alter: true });  
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();

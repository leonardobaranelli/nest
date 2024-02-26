import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
//import * as cookieParser from 'cookie-parser';
import cookieParser from 'cookie-parser';
import { execSync } from 'child_process';

function getCurrentGitBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error('Error getting current branch name::', error);
    return '';
  }
}

async function bootstrap() {
  const currentBranch = getCurrentGitBranch();
  const isMainBranch = currentBranch === 'main';

  const frontUrl = isMainBranch
    ? process.env.DEPLOY_FRONTEND_URL
    : process.env.FRONTEND_URL;

  const backUrl = isMainBranch
    ? process.env.DEPLOY_BACK_URL
    : process.env.BACKEND_URL;

  process.env.FRONTEND_URL = frontUrl;
  process.env.BACKEND_URL = backUrl;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: frontUrl,
    methods: '*',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  const sequelize = app.get(Sequelize);
  await sequelize.sync();
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();

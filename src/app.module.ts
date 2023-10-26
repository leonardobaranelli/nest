import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User, Post, Rent, Comment, Score } from './shared/models';
import { config } from 'dotenv';
import { PostModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 5432,
      models: [User, Post, Rent, Comment, Score],
    }),
    PostModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

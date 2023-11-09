import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User, Post, Rent, Comment, Score } from './shared/models';
import { config } from 'dotenv';
import { PostModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { AppMailerModule } from './mailer/mailer.module';
import { ScoreModule } from './score/score.module';

config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.MY_DB_HOST,
      database: process.env.MY_DB_NAME,
      username: process.env.MY_DB_USER,
      password: process.env.MY_DB_PASS,
      //#############################//
      // host: process.env.DB_HOST,
      // database: process.env.DB_NAME,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASS,
      //#############################//
      // host: process.env.DEV_DB_HOST,
      // database: process.env.DEV_DB_NAME,
      // username: process.env.DEV_DB_USER,
      // password: process.env.DEV_DB_PASS,
      port: 5432,
      models: [User, Post, Rent, Comment, Score],
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    PostModule,
    UsersModule,
    CloudinaryModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), // <-- .env global
    PaymentModule,
    AppMailerModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

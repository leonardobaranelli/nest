import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User, Post, Rent, Comment, Score, Favorite, Sell } from './shared/models';
import { config } from 'dotenv';
import { PostModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { AppMailerModule } from './mailer/mailer.module';
import { ScoreModule } from './score/score.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RentModule } from './rent/rent.module';
import { SellModule } from './sell/sell.module';
import { CommentModule } from './comment/comment.module';

config();

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async () => {
        return {
          dialect: 'postgres',
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          port: 5432,
          models: [User, Post, Rent, Comment, Score, Favorite, Sell],
          dialectModule: require('pg'),
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
    PostModule,
    UsersModule,
    CloudinaryModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentModule,
    AppMailerModule,
    ScoreModule,
    FavoritesModule,
    RentModule,
    SellModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
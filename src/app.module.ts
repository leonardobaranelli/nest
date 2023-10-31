import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { User, Post, Rent, Comment, Score } from './shared/models';
import { config } from 'dotenv';
import { PostModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config'; // Hace que las variables de entorno sean globales

import { AuthModule } from './auth/auth.module';

import { StripeModule } from 'nestjs-stripe';
import { PaymentModule } from './payment/payment.module';


config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME, 
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 5432,
      models: [User, Post, Rent, Comment, Score],
      dialectOptions: {
        ssl: {
          require: true,
          //rejectUnauthorized: false, 
        },
      },
    }),
    PostModule,
    UsersModule,
    CloudinaryModule,    
    AuthModule,   
    ConfigModule.forRoot({ isGlobal: true }),   // <-- .env global
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_SECRET,
      apiVersion: '2020-08-27',
    }), PaymentModule,
    // StripeModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     apiKey: configService.get('stripe_key'),
    //     apiVersion: '2020-08-27',
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
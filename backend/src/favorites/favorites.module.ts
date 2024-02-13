import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from '../shared/models';

@Module({
  imports: [SequelizeModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

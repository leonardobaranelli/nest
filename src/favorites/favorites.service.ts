import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from 'src/shared/models/favorite.model';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite,
  ) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteModel.create({ ...createFavoriteDto }).catch((e) => {
      throw new InternalServerErrorException('Error añadiendo Favorito');
    });
  }

  findAll(userId: string) {
    return this.favoriteModel.findAll({ where: { userId } }).catch((e) => {
      throw new InternalServerErrorException('Error buscando los Favoritos');
    });
  }

  remove(deleteFavoriteDto: DeleteFavoriteDto) {
    return this.favoriteModel
      .destroy({
        where: { ...deleteFavoriteDto },
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error eliminando Favorito');
      });
  }
}

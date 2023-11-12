import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from 'src/shared/models/favorite.model';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const newFav = await this.favoriteModel.create({...createFavoriteDto})
    return newFav;
  }

  async findAll(userId: string) {
    const favorites = await this.favoriteModel.findAll({ where: { userId } })
    return favorites;
  }

  async remove(deleteFavoriteDto: DeleteFavoriteDto) {
    const {userId , postId} = deleteFavoriteDto;
    const deleteFav = await this.favoriteModel.destroy({where: { userId, postId } })
    return deleteFav;
  }

}

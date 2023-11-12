import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from 'src/shared/models/favorite.model';
import { InjectModel } from '@nestjs/sequelize';

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

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(createFavoriteDto: CreateFavoriteDto) {
    const deleteFav = await this.favoriteModel.destroy({where: { userId: createFavoriteDto.userId , postId: createFavoriteDto.postId} })
    return ;
  }

}

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

  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
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

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }

/*   async getFavorites(id: string) {
    const favorites = await this.userModel.findAll({ where: { favorite: id } })
    return favorites;
  }

  async addFavorite(userId: string, postId: string) {
    const user = await

  } */
}

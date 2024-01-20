import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto).catch((e) => {
      throw e;
    });
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoritesService.findAll(id).catch((e) => {
      throw e;
    });
  }

  @Delete('delete')
  remove(@Body() deleteFavoriteDto) {
    return this.favoritesService.remove(deleteFavoriteDto).catch((e) => {
      throw e;
    });
  }
}

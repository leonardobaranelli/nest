import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.favoritesService.findAll(id);
  }

  @Delete('delete')
  remove(@Body() CreateFavoriteDto) {
    return this.favoritesService.remove(CreateFavoriteDto);
  }
}

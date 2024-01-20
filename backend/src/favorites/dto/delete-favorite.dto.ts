import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFavoriteDto extends PartialType(CreateFavoriteDto) {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}

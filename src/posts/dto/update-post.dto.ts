import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber()
  days?: number;

  @IsString()
  condition?: string;

  @IsString()
  image?: string;

  @IsString()
  title?: string;

  @IsString()
  country?: string;

  @IsString()
  city?: string;

  @IsString()
  streetName?: string;

  @IsString()
  streetNumber?: string;

  @IsString()
  floorNumber?: string;

  @IsString()
  aptNumber?: string;

  @IsNumber()
  price?: number;

  @IsString()
  description?: string;
}
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  // Data Transfer Object (DTO) for creating a post || Posts
  @IsNotEmpty()
  @IsNumber()
  days: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  streetName: string;

  @IsNotEmpty()
  @IsString()
  streetNumber: string;

  @IsString()
  floorNumber: string;

  @IsString()
  aptNumber: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
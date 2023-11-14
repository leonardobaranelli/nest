import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  // Data Transfer Object (DTO) for creating a post || Posts

  @IsNotEmpty()
  @IsNumber()
  days: number; //❌ --> ENUM: 1, 7, 15, 30, 60, 90

  @IsNotEmpty()
  @IsString()
  condition: string; //rent - sell

  @IsNotEmpty()
  @IsString()
  type: string; //❓ --> ENUM: CASA, DEPARTAMENTO, LOCAL, OFICINA, TERRENO, OTRO

  @IsNotEmpty()
  images: Array<string>;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
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

  @IsOptional()
  @IsString()
  floorNumber: string;

  @IsOptional()
  @IsString()
  aptNumber: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

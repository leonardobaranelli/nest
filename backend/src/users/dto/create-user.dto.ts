import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  MinLength,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim()) // esta validación es para que no se pueda registrar un usuario con espacios en blanco
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsNumber()
  readonly phone?: number;

  @IsOptional()
  @IsNumber()
  readonly personalId?: number; // Si no tiene ID, no puede acceder a Reservas ni Publicar Propiedades

  @IsOptional()
  @IsString()
  readonly rol?: string;

  @IsOptional()
  @IsDate()
  readonly deletedAt?: Date;

  @IsOptional()
  @IsUrl()
  readonly avatar_url?: string;
}

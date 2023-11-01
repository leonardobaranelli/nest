import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsDate, MinLength } from 'class-validator';

export class CreateUserDto {
  
  @Transform(({ value }) => value.trim())  // esta validación es para que no se pueda registrar un usuario con espacios en blanco
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())  
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim()) 
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform(({ value }) => value.trim()) 
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsNumber()
  personalId: number;

  @IsOptional()
  @IsString()
  rol?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
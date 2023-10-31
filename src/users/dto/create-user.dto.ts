import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsNumber()
  personalId: number;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
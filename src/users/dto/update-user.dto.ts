import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Is } from 'sequelize-typescript';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsNumber()
  personalId?: number;

  @IsOptional()
  @IsString()
  rol?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}

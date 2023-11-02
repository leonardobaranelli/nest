import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDate,
} from 'class-validator';

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
  @IsDate()
  deletedAt?: Date;
}

import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,  
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  // Data Transfer Object (DTO) for logging in a user
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

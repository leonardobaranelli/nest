import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  // FUNCION A IMPLEMENTAR
  //
  // @Transform(({ value }) => value.trim())
  // @IsString()
  // @IsOptional()
  // username?: string;

  @IsEmail()
  @IsNotEmpty()
  // @ValidateIf((o) => !o.username, { message: 'Either username or email must be provided' })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

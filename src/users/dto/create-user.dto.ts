import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  
  @IsNotEmpty()
  @IsString()
  readonly username: string;  

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
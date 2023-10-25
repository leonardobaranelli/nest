import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    readonly email?: string;
    
    @IsString()
    readonly username?: string;

    @IsString()
    readonly password?: string;
}
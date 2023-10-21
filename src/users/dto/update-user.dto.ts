import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    readonly email?: string;
    
    @IsString()
    readonly username?: string;

    @IsString()
    readonly password?: string;
}

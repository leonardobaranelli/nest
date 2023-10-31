import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    createUserDto: CreateUserDto,
  ){
    
    return this.authService.register(createUserDto);
  }
  
  @Post('login')
  login(
    @Body()
    loginUserDto: LoginUserDto,
  ){
      
      return this.authService.login(loginUserDto);
    }
  
}

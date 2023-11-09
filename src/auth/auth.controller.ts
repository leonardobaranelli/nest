import { Controller, Query, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(createUserDto);
    return result;
  }

  @Post('login')
  async login(
    @Body()
    loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginUserDto);
    return result;
  }

  @Get('google')
  async googleUrl(@Res({ passthrough: true }) res: Response) {
    await this.authService
      .googleUrl()
      .then((url) => res.redirect(url))
      .catch((err) => console.log(err));
  }

  @Get('google/callback')
  async googleLogin(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, email } = await this.authService.googleLogin(code);

    res.cookie('token', token, { httpOnly: true });
    res.cookie('email', email);
    
    res.redirect(`${process.env.FRONTEND_URL}/Views/home`); // Frontend url

  }
}

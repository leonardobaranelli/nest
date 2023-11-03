import { Controller, Query, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(
    @Body()
    loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
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

    res.redirect('http://localhost:3001/exito'); // Frontend url
  }
}

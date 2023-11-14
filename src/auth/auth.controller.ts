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
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(createUserDto).catch((e) => {
      throw e;
    });
  }

  @Post('login')
  login(
    @Body()
    loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto).catch((e) => {
      throw e;
    });
  }

  @Get('google')
  googleUrl(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.authService.googleUrl());
  }

  @Get('google/callback')
  async googleLogin(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, email } = await this.authService.googleLogin(code);

    res.cookie('token', token, { httpOnly: true });
    res.cookie('email', email);

    res.redirect(`${process.env.FRONTEND_URL}/Views/home`);
  }

  @Get('verify')
  verify(@Query('token') token: string, @Query('email') email: string) {
    return this.authService.validateUser(email, token).catch((e) => {
      throw e;
    });
  }
}

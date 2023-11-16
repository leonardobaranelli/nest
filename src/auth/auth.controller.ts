import {
  Controller,
  Query,
  Post,
  Body,
  Res,
  Get,
  Req,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { Request, Response } from 'express';

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

    res.cookie('token', token);
    res.cookie('email', email);

    res.redirect(`${process.env.FRONTEND_URL}/Views/Login`);
  }

  @Get('token')
  token(@Query('token') token: string, @Query('email') email: string) {
    return this.authService.validateUser(email, token).catch((e) => {
      throw e;
    });
  }

  @Get('verify')
  async verify(
    @Query('code') code: string,
    @Query('email') email: string,
    @Req() req: Request,
  ) {
    const user = await this.authService
      .emailVerify(code, email)
      .catch((error) => {
        if (
          error.message ===
          'Usuario no encontrado, si cree que es un error comuniquese con el administrador'
        ) {
          throw new NotFoundException(error.message);
        } else if (error.message === 'Codigo de verificacion incorrecto') {
          throw new BadRequestException(error.message);
        } else {
          throw new InternalServerErrorException(error.message);
        }
      });

    const { token } = await this.authService.login(user);

    req.res.cookie('token', token, { httpOnly: true });
    req.res.cookie('email', email);

    req.res.redirect(`${process.env.FRONTEND_URL}`); // Frontend url
  }
}

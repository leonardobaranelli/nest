import { BadRequestException, Controller, Get, InternalServerErrorException, NotFoundException, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { User } from './shared/models';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('verify')
  async verify(
    @Query('code') code: string,
    @Query('email') email: string,
    @Req() req: Request,
  ) {
    const user = await this.appService.verify(code, email)
    .catch((error) => {
      if (error.message === 'Usuario no encontrado, si cree que es un error comuniquese con el administrador') {
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

    req.res.redirect('http://localhost:3001/exito'); // Frontend url
  }

  @Get('exito')
  async getCookie(@Req() req: Request) {
    return this.appService.getCookie(req);
  }
}

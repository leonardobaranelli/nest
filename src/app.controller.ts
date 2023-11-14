import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
  Req,
} from '@nestjs/common';
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

  

  @Get('exito')
  async getCookie(@Req() req: Request) {
    return this.appService.getCookie(req);
  }
}

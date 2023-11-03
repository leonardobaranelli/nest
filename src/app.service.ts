import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  getCookie(req: Request): string {
    return req.cookies;
  }
}

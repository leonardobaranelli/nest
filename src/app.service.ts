import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './users/user.service';
import { User } from './shared/models';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  

  getCookie(req: Request): string {
    return req.cookies;
  }
}

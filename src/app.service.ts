import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './users/user.service';
import { User } from './shared/models';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
  ) {}

  verify(code: string, email: string) {
    return this.userService
      .findOneByEmail(email)
      .catch(error => {
          throw new Error('Usuario no encontrado, si cree que es un error comuniquese con el administrador')
      })
      .then((user) => {
        if(user.id === code) {
          user.update({ verified_email: true });
          return user;
        } else {
          throw new Error('Codigo de verificacion incorrecto');
        }
      });
  }

  getCookie(req: Request): string {
    return req.cookies;
  }
}

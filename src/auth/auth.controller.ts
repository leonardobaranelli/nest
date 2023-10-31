import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {


    @Post('register')
    register(@Res() res: Response){
      return res.status
    }

    @Post('login')
    login(@Res() res: Response){
      return res.send("login");
    }
  

   
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { plainToClass } from 'class-transformer';
import { FacebookUserDto } from './dto/facebookUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';



interface FacebookData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

interface FacebookResponse {
  data: FacebookData;
}

interface GoogleData {
  id: string;
  email: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  picture: string;
}

interface GoogleResponse {
  data: GoogleData;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      ...createUserDto,
      password: await bcryptjs.hashSync(createUserDto.password, 10),
    });

    return this.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user: CreateUserDto | undefined =
      await this.userService.findOneByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compareSync(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email: user.email,
    };
  }

  

  async googleUrl() {
    // Aqui vamos a redireccionar al usuario a la página de google para que inicie sesión

    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const queryParams = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: 'http://localhost:3001/auth/google/callback',
      response_type: 'code',
      scope: 'openid profile email',
    });

    const googleAuthRedirectUrl = `${googleAuthUrl}?${queryParams.toString()}`;
    return googleAuthRedirectUrl;
  }

  async googleLogin(code: string) {
    // Intercambia el código de autorización por un token de acceso
    const response = await this.httpService
      .post(
        'https://oauth2.googleapis.com/token',
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3001/auth/google/callback', // Reemplaza esto con tu URI de redirección
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();

    const accessToken = response.data.access_token;
    // Usa el token de acceso para obtener la información del perfil del usuario
    const { data: user }: GoogleResponse = await this.httpService
      .get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();

    const { id: googleId, email, given_name, family_name, picture, verified_email } = user;
    
    if(!verified_email) throw new BadRequestException('Email not verified');
    
    // Buscamos al usuario en la base de datos por su email
    // Si el usuario no existe, puedes crear un nuevo usuario con la información de Google
    if (!await this.userService.findOneByEmail(email)) {
      await this.userService.create({
        username: `${given_name}${family_name}`,
        email: email,
        firstName: given_name,
        lastName: family_name,
        password: googleId, // Esto no es seguro, provisorio
        // avatar: picture,
      });
    } else {
      await this.userService.findOneByEmail(email).then(user => {
        if(user.password !== googleId) throw new BadRequestException('Wrong authentication');
      });
    }

    // Generamos un JWT y devolvemos al usuario
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email
    };
  }

  async facebookUrl() {
    // Aquí vamos a redireccionar al usuario a la página de Facebook para que inicie sesión

    const facebookAuthUrl = 'https://www.facebook.com/v11.0/dialog/oauth';
    const queryParams = new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID,
      redirect_uri: 'http://localhost:3001/auth/facebook/callback',
      response_type: 'code',
      scope: 'email',
    });

    const facebookAuthRedirectUrl = `${facebookAuthUrl}?${queryParams.toString()}`;
    return facebookAuthRedirectUrl;
  }

  async facebookLogin(code: string) {
    // Intercambia el código de autorización por un token de acceso
    const response = await this.httpService
      .get(
        'https://graph.facebook.com/v11.0/oauth/access_token',
        {
          params: {
            client_id: process.env.FACEBOOK_CLIENT_ID,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3001/auth/facebook/callback', // Reemplaza esto con tu URI de redirección
          },
        },
      )
      .toPromise();

    const accessToken = response.data.access_token;
    // Usa el token de acceso para obtener la información del perfil del usuario
    const { data: user }: FacebookResponse = await this.httpService
      .get('https://graph.facebook.com/v11.0/me', {
        params: {
          fields: 'id,email,first_name,last_name,picture',
          access_token: accessToken,
        },
      })
      .toPromise();

    const facebookUserDto = plainToClass(FacebookUserDto, user);
    const errors = await validate(facebookUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // Buscamos al usuario en la base de datos por su email
    // Si el usuario no existe, puedes crear un nuevo usuario con la información de Facebook
    const email = facebookUserDto.email;
    if (!await this.userService.findOneByEmail(email)) {
      await this.userService.create({
        username: `${facebookUserDto.first_name}${facebookUserDto.last_name}`,
        email: email,
        firstName: facebookUserDto.first_name,
        lastName: facebookUserDto.last_name,
        password: facebookUserDto.id, // Esto no es seguro, provisorio
        // avatar: facebookUserDto.picture.data.url,
      });
    } else {
      await this.userService.findOneByEmail(email).then(user => {
        if(user.password !== facebookUserDto.id) throw new BadRequestException('Wrong authentication');
      });
    }

    // Generamos un JWT y devolvemos al usuario
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email
    };
  }

}

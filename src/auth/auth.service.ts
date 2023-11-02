import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { join } from 'path';

interface GithubData {
  id: number;
  login: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface GithubResponse {
  data: GithubData;
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

  async githubUrl() {
    // Aqui vamos a redireccionar al usuario a la página de github para que inicie sesión
    const githubAuthUrl = 'https://github.com/login/oauth/authorize';
    const queryParams = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: 'read:user',
    });

    const githubAuthRedirectUrl = `${githubAuthUrl}?${queryParams.toString()}`;
    return githubAuthRedirectUrl;
  }

  async githubLogin(code: string) { //CAMBIAMOS A FACEBOOK
    // Intercambia el código de autorización por un token de acceso
    const response = await this.httpService
      .post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .toPromise();

    const accessToken = response.data.access_token;
    // Usa el token de acceso para obtener la información del perfil del usuario
    const { data }: GithubResponse = await this.httpService
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();
    
    const { id: githubId, login, email, name, avatar_url } = data;
    // Aquí puedes buscar al usuario en tu base de datos por su nombre de usuario de GitHub
    // Si el usuario no existe, puedes crear un nuevo usuario con la información de GitHub
    if (!this.userService.findOneByEmail(email)) {
      await this.userService.create({
        username: login,
        email: email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        password: githubId.toString(), // Esto no es seguro, provisorio
        // avatar: picture,
      });
    } else {
      await this.userService.findOneByEmail(email).then(user => {
        if(user.password !== githubId.toString()) throw new BadRequestException('Wrong authentication');
      });
    }

    // Generamos un JWT y devolvemos al usuario
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email,
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
}

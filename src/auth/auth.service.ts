import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { AppMailerService } from 'src/mailer/mailer.service';

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
    private readonly mailerService: AppMailerService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Email ya registrado');
    }

    await this.userService
      .create({
        ...createUserDto,
        password: await bcryptjs.hashSync(createUserDto.password, 10),
      })
      .then((user) => {
        this.mailerService.created({
          emailTo: user.email,
          emailFrom: 'mailer.nest.app@gmail.com',
          firstName: user.firstName,
          code: user.id,
        });
      });

    return this.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user: CreateUserDto = await this.userService
      .findOneByEmail(loginUserDto.email)
      .catch((e) => {
        throw new InternalServerErrorException('Error al buscar el usuario');
      });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid =
      loginUserDto.password === user.password
        ? true
        : await bcryptjs.compareSync(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
    };
  }

  emailVerify(code: string, email: string) {
    return this.userService
      .findOneByEmail(email)
      .catch((e) => {
        throw new Error('Usuario no encontrado');
      })
      .then((user) => {
        if (!user) throw new NotFoundException('Usuario no encontrado');
        if (user.id !== code)
          throw new UnauthorizedException('Codigo de verificacion incorrecto');

        return user.update({ isVerified: true });
      });
  }

  async validateUser(email: string, token: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isTokenValid = await this.jwtService.verifyAsync(token);

    if (!isTokenValid) {
      throw new UnauthorizedException('Token incorrecto');
    }

    return user;
  }

  googleUrl() {
    // Aqui vamos a redireccionar al usuario a la página de google para que inicie sesión
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const queryParams = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
      response_type: 'code',
      scope: 'openid profile email',
    });
    return `${googleAuthUrl}?${queryParams.toString()}`;
  }

  async googleLogin(code: string) {
    // Intercambia el código de autorización por un token de acceso
    const { data } = await this.httpService
      .post(
        'https://oauth2.googleapis.com/token',
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`, // Reemplaza esto con tu URI de redirección
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();

    const accessToken = data.access_token;
    // Usa el token de acceso para obtener la información del perfil del usuario
    const { data: user }: GoogleResponse = await this.httpService
      .get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .toPromise();

    const {
      id: googleId,
      email,
      given_name,
      family_name,
      picture,
      verified_email,
    } = user;

    if (!verified_email) throw new BadRequestException('Gmail sin verificar');

    const userDB = await this.userService.findOneByEmail(email);
    if (!userDB) {
      await this.userService
        .create({
          username: `${given_name}${family_name}`,
          email: email,
          firstName: given_name,
          lastName: family_name,
          password: await bcryptjs.hashSync(googleId, 10),
          avatar_url: picture,
        })
        .then((user) => {
          this.mailerService.created({
            emailTo: user.email,
            emailFrom: 'mailer.nest.app@gmail.com',
            firstName: user.firstName,
            code: user.id,
          });
        });
    } else {
      await this.userService.findOneByEmail(email).then((user) => {
        const isValid = bcryptjs.compareSync(googleId, user.password);
        if (!isValid)
          throw new BadRequestException('Authenticacion incorrecta');
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
  /*
  Eliminar Facebook --> No se usa

  async facebookUrl() {
    // Aquí vamos a redireccionar al usuario a la página de Facebook para que inicie sesión

    const facebookAuthUrl = 'https://www.facebook.com/v11.0/dialog/oauth';
    const queryParams = new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID,
      redirect_uri: `${process.env.BACKEND_URL}/auth/facebook/callback`,
      response_type: 'code',
      scope: 'email',
    });

    const facebookAuthRedirectUrl = `${facebookAuthUrl}?${queryParams.toString()}`;
    return facebookAuthRedirectUrl;
  }

  async facebookLogin(code: string) {
    // Intercambia el código de autorización por un token de acceso
    const response = await this.httpService
      .get('https://graph.facebook.com/v11.0/oauth/access_token', {
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          code: code,
          redirect_uri: `${process.env.BACKEND_URL}/auth/facebook/callback`, // Reemplaza esto con tu URI de redirección
        },
      })
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
    if (!(await this.userService.findOneByEmail(email))) {
      await this.userService.create({
        username: `${facebookUserDto.first_name}${facebookUserDto.last_name}`,
        email: email,
        firstName: facebookUserDto.first_name,
        lastName: facebookUserDto.last_name,
        password: facebookUserDto.id, // Esto no es seguro, provisorio
        // avatar: facebookUserDto.picture.data.url,
      });
    } else {
      await this.userService.findOneByEmail(email).then((user) => {
        if (user.password !== facebookUserDto.id)
          throw new BadRequestException('Wrong authentication');
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
  */
}

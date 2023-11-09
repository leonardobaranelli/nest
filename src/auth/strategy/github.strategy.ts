// github.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { login, name, avatar_url, email } = profile._json;
    const user = {
      username: login,
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      avatar: avatar_url,
      accessToken
    };
    done(null, user);
  }
}
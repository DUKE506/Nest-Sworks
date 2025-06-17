import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
      // passReqToCallback: true,
    });
  }

  async validate(
    // req: Request,
    account: string,
    password: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(account, password);

    if (!user) {
      throw new UnauthorizedException('로그인 실패');
    }

    return user;
  }
}

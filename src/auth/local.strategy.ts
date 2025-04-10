import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    });
  }

  async validate(account: string, password: string): Promise<any> {
    console.log(account);
    console.log(password);
    const user = await this.authService.validateUser(account, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

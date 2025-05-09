import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 미들웨어(Guard)에서 사용
   * @param account
   * @param password
   * @returns
   */
  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.userService.findOneByAccount(account);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.account,
      sub: user.userId,
      permission: user.permission,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      place_id: user?.workplace?.id ?? null,
      user: user,
    };
  }
}

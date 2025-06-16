import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { WorkplaceService } from 'src/workplace/workplace.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private workplaceService: WorkplaceService,
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
      role: user.permission,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: '7d',
      }),
      place_id: user?.workplace?.id ?? null,
      user: user,
    };
  }

  async selectWorkplace(userPayload: any, workplaceId: number) {
    //1. 사용자 검증
    console.log(userPayload.sub);
    // const user = await this.userService.findAdminDetailById(userPayload.sub)
  }
}

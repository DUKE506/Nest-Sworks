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
      sub: user.id,
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

    const user = await this.userService.findAdminDetailById(userPayload.sub);
    if (!user) throw new UnauthorizedException('사용자가 존재하지 않습니다.');

    //2. 관리자가 해당 사업장에 대한 접근권한 확인
    const hasAccess = await this.workplaceService.findOneAdminWorkplaceByIds(
      userPayload.sub,
      workplaceId,
    );

    if (!hasAccess)
      throw new UnauthorizedException('해당 사업장에 접근 권한이 없습니다.');

    //3. 새로운 토큰 생성
    const payload = {
      username: user.account,
      sub: user.id,
      role: user.permission.permission,
      place_id: workplaceId,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: '7d',
      }),
      place_id: workplaceId,
      user: user,
    };
  }
}

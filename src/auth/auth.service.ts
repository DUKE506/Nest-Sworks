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
   * 로그인 서비스
   * @returns
   */
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(loginDto.account);

    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, name: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

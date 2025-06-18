import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY!,
    });
  }

  async validate(payload: any) {
    console.log('검증 페이로드 시작');
    console.log(payload);
    console.log('검증 페이로드 끝');
    return {
      userId: payload.sub,
      username: payload.username,
      permission: payload.role,
      workplaceId: payload.place_id ?? null,
    };
  }
}

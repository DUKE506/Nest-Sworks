// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// import { IS_PUBLIC_KEY } from 'src/core/decorator/public.decorator';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     //public 요펑 제외
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (isPublic) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     console.log('switchToHttp.getRequest : ', request);
//     const token = this.extractTokenFromHeader(request);
//     console.log('token : ', token);

//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         //env로 관리예정
//         secret: 'stec',
//       });
//       request['user'] = payload;
//     } catch {
//       throw new UnauthorizedException();
//     }

//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }

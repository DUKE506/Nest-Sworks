import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     //가드에서 params 사용방법
//     // const request = context.switchToHttp().getRequest();
//     // request.body.loginType = request.params.loginType;
//     // return (await super.canActivate(context)) as boolean;
//   }

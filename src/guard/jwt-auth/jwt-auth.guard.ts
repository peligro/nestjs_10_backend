import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {


  canActivate(context: ExecutionContext) 
  {
    return super.canActivate(context);
  }
  handleRequest(err: any, user: any, info: any) {
      if(err || !user)
      {
        throw err || new UnauthorizedException();//retornar un estado HTTP 401, es decir no autorizado
      }
      return user;
  }   
}

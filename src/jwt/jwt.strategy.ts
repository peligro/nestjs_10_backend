import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//Bearer sfdsf.dsf.dsfd
      ignoreExpiration: false,
      secretOrKey: process.env.CURSO_SERVER_JWT_SECRET 
    });
  }

  async validate(payload: any) {
  
    return { userId: payload.sub, username: payload.username };
  }
}
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//Bearer ssss,
            ignoreExpiration: false,
            secretOrKey: process.env.CURSO_SERVER_JWT_SECRET
        });
    }

    async validate(payload:any)
    {
        return {userId: payload.sub, username: payload.username};
    }
}
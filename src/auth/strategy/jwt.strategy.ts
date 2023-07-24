import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });


  }

  async validate(payload: any) {
    console.log('Payload', payload);
    console.log( typeof payload.roles);
    

    return {
      email: payload.email,
      userId: payload.userId,
      roles: payload.roles
    };
    // return { userId: payload.sub, username: payload.username };
  }
}
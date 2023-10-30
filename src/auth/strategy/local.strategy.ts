import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { log } from 'console';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    log('local.strategy.ts - Constructor');
    super({

        //Modificacion de los campos permitidos en Passport 
        usernameField: 'email',
        passwordField: 'password'
    });
  }

  //Funcion de validacion previa 
  async validate( email: string, password: string ): Promise<any> {

    const user = await this.authService.validateUser( email, password);

    // log("Validate User", user);

    if (!user) {       
      throw new UnauthorizedException("Usuario y/o contraseña invalido.");
    }
    return user;
  }
}
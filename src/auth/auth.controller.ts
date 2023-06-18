import {Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService ) {}

    @Post('/login')
    async login( @Body() userData: any) {
        
        console.log( "email:", userData.email);
        console.log( "password:", userData.password);
        
        try {
        
            //VErificar si es un usuario valido
            const user = await this.authService.validateUser( userData.email, userData.password);



            if( user ){



                // const {
                //     name,
                //     surname,
                //     password,
                //     isActive,
                //     createdAt,
                //     updatedAt, ...dataUser} = user.dataValues;

                // log("DATA USER", dataUser);

                // log("JWT_KEY:", process.env.JWT_KEY);

                //Generacion del access_token con JwT
                const token = this.authService.login(user);
                return token;

            } else {
                return {
                    'msg': "Error al iniciar sesión"
                }
            }            
                        
        } catch (err) {
            log("error", err);
            return err;
        }
        

    }


}

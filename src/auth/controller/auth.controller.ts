import {Controller, Post, Get, UseGuards, Request } from '@nestjs/common';

import { log } from 'console';

import { AuthService } from '../service/auth.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService ) {}

    @UseGuards(LocalAuthGuard)  // Guard para validacion de clave
    @Post('/login')
    async login( @Request() req: any) {

        log('USER:', req.user);

        return this.authService.login(req.user);   
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getJwt')
    async getJwt(@Request() req: any) {
        // log("Validar REQ:", req);
        return {
            'msg': 'Accede a endpoint Validate'
        }
    }


}

import {Controller, Post, Get, UseGuards, Request } from '@nestjs/common';


import { AuthService } from '../service/auth.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles-auth.guard';

import { HasRoles } from '../decorators/roles.decorator';

import { Role } from 'src/users/model/enum/role.enum';

@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService ) {}

    @UseGuards(LocalAuthGuard)  // Guard para validacion de clave
    @Post('/login')
    async login( @Request() req: any) {

        console.log('USER:', req.user);

        return this.authService.login(req.user);   
    }

    @HasRoles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/getJwt')
    async getJwt(@Request() req: any) {
        // log("Validar REQ:", req);
        return {
            'msg': 'Accede a endpoint Validate'
        }
    }


}

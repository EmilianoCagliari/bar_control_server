import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/service/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {

        //Comprueba si hay usuario en la BD
        const user = await this.usersService.findEmail(email);

        //Comprobar password hashed
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //Si hay datos en user y si la pass de user es valida.
        if (user && isPasswordValid ) {
            const { name,
                surname,
                password,
                isActive,
                createdAt,
                updatedAt, ...result } = user.dataValues
            return result;
        }
        return null;
    }

    async login(user: any) {

        const payload = { email: user.email, userId: user.id, roles: JSON.parse(user.role) };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findEmail(email);

        if (user && bcrypt.compare(password, user.password)) {
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



        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}

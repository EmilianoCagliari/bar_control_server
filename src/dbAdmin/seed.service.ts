import { Injectable } from '@nestjs/common';
import { User } from 'src/users/model/entities/user.entity';
import { UsersService } from 'src/users/service/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/model/enum/role.enum';

@Injectable()
export class SeedService {
    constructor(private readonly userService: UsersService) { }

    async seedData() {
        // Verificar si el registro ya existe en la base de datos
        const existingRecord = await this.userService.findEmail("admin@barcontrol.com");
        if (existingRecord) {
            console.log('El registro ya existe en la base de datos. No se agrega nuevamente.');
            return;
        }

        //Creacion del objeto de clase User para encriptar data.
        const AdminUser = new User({
            name: "admin",
            surname: "admin",
            email: "admin@barcontrol.com",
            password: "Admin123.",
            role: JSON.stringify( [Role.Admin] )
        })
        

        console.log("AdminUser:", AdminUser);

        //Password encrypt
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(AdminUser.dataValues.password, salt);
        AdminUser.dataValues.password = hash;

        //Creacion Admin User
        this.userService.create(AdminUser.dataValues);

        console.log('Registro agregado a la base de datos.');
    }
}

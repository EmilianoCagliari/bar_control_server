import { Column, Model, Table } from "sequelize-typescript";
import { Role } from "../enum/role.enum";

@Table
export class User extends Model {

    @Column
    name: string;

    @Column
    surname: string;

    @Column
    email: string;

    @Column
    password: string;

    // @Column({ type: DataTypes.STRING, defaultValue: JSON.stringify(Role.User)  })
    @Column({ defaultValue: Role.User })
    role: number;

    @Column({ defaultValue: true })
    isActive: boolean
}
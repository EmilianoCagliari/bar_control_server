import { Column, Model, Table } from "sequelize-typescript";
import { Role } from "../enum/role.enum";
import { DataTypes } from "sequelize";

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

    @Column({ type: DataTypes.STRING, defaultValue: JSON.stringify([Role.User])  })
    role: string;

    @Column({ defaultValue: true })
    isActive: boolean
}
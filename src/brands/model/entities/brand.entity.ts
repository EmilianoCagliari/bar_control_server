import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Brand extends Model{

    @Column
    name: string;

    @Column
    distributor: string;

}

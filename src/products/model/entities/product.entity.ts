import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Brand } from "../../../brands/model/entities/brand.entity";

@Table
export class Product extends Model {

    @Column
    name: string;

    @ForeignKey(() => Brand)
    @Column
    brand_id: number;

    @BelongsTo(() => Brand)
    brand: Brand;

    @Column
    type: string;

    @Column
    initialWeight: string;


}

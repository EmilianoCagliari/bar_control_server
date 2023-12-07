import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Brand } from "../../../brands/model/entities/brand.entity";

@Table
export class Product extends Model {

    @Column
    name: string;

    @Column({ type: DataType.FLOAT(10, 2) })
    price: number;

    @Column
    quantity: number;

    @ForeignKey(() => Brand)
    @Column
    brand_id: number;

    @BelongsTo(() => Brand)
    brand: Brand;

    @Column
    type: string;

    @Column({ type: DataType.FLOAT(6, 2) })
    initialWeight: number;

    @Column({ type: DataType.FLOAT(6, 2) })
    fullWeight: number;

    @Column({ unique: true })
    barcode: string

}

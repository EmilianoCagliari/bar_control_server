import { Model, Column, ForeignKey, HasOne, Table, BelongsTo } from "sequelize-typescript";
import { Product } from "src/products/model/entities/product.entity";
import { User } from "src/users/model/entities/user.entity";

@Table
export class WeightRegister extends Model {

    @Column
    weight: string;

    @ForeignKey(() => Product)
    @Column
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => User)
    @Column
    user_id: number

    @BelongsTo(() => User)
    user: User;

}

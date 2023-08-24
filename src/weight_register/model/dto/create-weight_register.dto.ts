import { IsDecimal, IsInt } from "class-validator";

export class CreateWeightRegisterDto {

    @IsDecimal()
    weight: number

    @IsInt()
    product_id: number

    @IsInt()
    user_id: number

}

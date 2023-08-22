import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsDecimal()
    price: number

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    brand_id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    type?: string;

    @IsNotEmpty()   
    initialWeight: string;
}

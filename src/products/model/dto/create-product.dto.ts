import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    name: string;

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

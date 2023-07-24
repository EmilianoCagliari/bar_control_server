import { IsString, IsEmail, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    name: string;
    
    @IsString()
    surname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsOptional()
    role?: number;
}

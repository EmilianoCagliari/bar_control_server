import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    name?: string;

    @IsOptional()
    surname?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    role?: number;

    @IsOptional()
    isActive: boolean;
}

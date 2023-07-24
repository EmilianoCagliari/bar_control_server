
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class PatchUserTransformer {

    // Transforma la data recibida basada en el DTO y regresando el nuevo valor.
    transform(body: any): UpdateUserDto {        
        return plainToClass(UpdateUserDto, body);
    }
}
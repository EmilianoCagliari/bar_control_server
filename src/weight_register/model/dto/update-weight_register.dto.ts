import { PartialType } from '@nestjs/mapped-types';
import { CreateWeightRegisterDto } from './create-weight_register.dto';

export class UpdateWeightRegisterDto extends PartialType(CreateWeightRegisterDto) {}

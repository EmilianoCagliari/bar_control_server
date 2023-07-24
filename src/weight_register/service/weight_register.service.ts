import { Injectable } from '@nestjs/common';
import { CreateWeightRegisterDto } from '../model/dto/create-weight_register.dto';
import { UpdateWeightRegisterDto } from '../model/dto/update-weight_register.dto';

@Injectable()
export class WeightRegisterService {
  create(createWeightRegisterDto: CreateWeightRegisterDto) {
    return 'This action adds a new weightRegister';
  }

  findAll() {
    return `This action returns all weightRegister`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weightRegister`;
  }

  update(id: number, updateWeightRegisterDto: UpdateWeightRegisterDto) {
    return `This action updates a #${id} weightRegister`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightRegister`;
  }
}

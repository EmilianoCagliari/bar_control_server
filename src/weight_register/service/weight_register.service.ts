import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWeightRegisterDto } from '../model/dto/create-weight_register.dto';
import { UpdateWeightRegisterDto } from '../model/dto/update-weight_register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WeightRegister } from '../model/entities/weight_register.entity';

@Injectable()
export class WeightRegisterService {

  constructor(
    @InjectModel(WeightRegister)
    private weightRegister: typeof WeightRegister
  ) { }

  async create(createWeightRegisterDto: any) {

    let created = null;

    try {

      created = await this.weightRegister.create(createWeightRegisterDto);
    } catch (error) {

      throw new HttpException({
        msg: 'Error crear el registro.',
        errorType: error.name,
        codeError: error.parent.code
      }, HttpStatus.BAD_REQUEST);
    }

    return created;
  }

  async findAll() {
    return await this.weightRegister.findAll();
  }

  async findOne(id: number) {

    return await this.weightRegister.findByPk(+id);
  }

  async update(id: number, updateWeightRegisterDto: UpdateWeightRegisterDto) {
    return `This action updates a #${id} weightRegister`;
  }

  async remove(id: number) {
    return `This action removes a #${id} weightRegister`;
  }
}

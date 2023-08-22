import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../model/dto/create-brand.dto';
import { UpdateBrandDto } from '../model/dto/update-brand.dto';
import { Brand } from '../model/entities/brand.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BrandsService {

  constructor(
    @InjectModel(Brand)
    private brandModel: typeof Brand
  ) { }

  async create(createBrandDto: any) {

    let created = null;
    //verificar si el email esta creado
    const isBrandExists = await this.brandModel.findOne({ where: { 'name': createBrandDto.name } })

    if (!isBrandExists) {
      created = await this.brandModel.create(createBrandDto);
    }

    return created

  }

  findAll() {
    return this.brandModel.findAll();
  }

  findOne(id: number) {
    return this.brandModel.findByPk(+id);
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return updateBrandDto;
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}

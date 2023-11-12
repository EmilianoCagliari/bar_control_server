import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../model/dto/create-product.dto';
import { UpdateProductDto } from '../model/dto/update-product.dto';
import { Product } from '../model/entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product)
    private productModel: typeof Product
  ) { }

  async create(createProductDto: any) {

    let created = null;
    //verificar si el email esta creado
    const isProductExists = await this.productModel.findOne({ where: { 'name': createProductDto.name } })

    if (!isProductExists) {
      try {
        created = await this.productModel.create(createProductDto);

      } catch (error) {
        console.log("error", error.parent.code);
        
        throw new HttpException( { 
            msg: 'Error crear el registro.',
            errorType: error.name,
            codeError: error.parent.code
          }, HttpStatus.BAD_REQUEST);

      }
    }

    return created
  }

  async findAll() {
    return await this.productModel.findAll();
  }

  async findOne(id: number) {
    return await this.productModel.findByPk(+id);
  }

  async findByBarcode( bc: string) {
    return await this.productModel.findOne({ where: {
      barcode: +bc
    }})
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    return `This action updates a #${id} product`;
  }

  async remove(id: number) {

    const deleted = await this.productModel.destroy({ where: { id: +id } });

    if (!deleted) {
      throw new HttpException({ msg: 'Error al eliminar el registro' }, HttpStatus.BAD_REQUEST);
    }

    return { msg: 'Registro eliminado correctamente' };
  }
}

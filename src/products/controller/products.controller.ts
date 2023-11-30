import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../model/dto/create-product.dto';
import { UpdateProductDto } from '../model/dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/model/enum/role.enum';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    // console.log("Data producto:", createProductDto);
    try {
      const response = await this.productsService.create(createProductDto);

      const final_response = {
        'status': 200,
        'product_created': true,
        'data': response
      }

      return final_response;

    } catch (error) {
      return error;
    }

  }

  @Get('p')
  findByBarcode(@Query('bc') bc: string) {
    // console.log("BC:", +bc);
    return this.productsService.findByBarcode(`${+bc}`);
  }
  
  @Get()
  findAllWithPagination(@Query('p') p: number) {
    try {

      if(p) {
        console.log("p", p);
        if (isNaN(p)) {
          throw new HttpException({ error: "El parameto 'p' es requerido." }, HttpStatus.BAD_REQUEST);
        }
        console.log("findAllWithPagination")
        return this.productsService.findAllWithPagination(p);
      }
      return this.productsService.findAll();

    } catch (error) {
      return error;
    }
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get(':id(\\d+)')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

 

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {

    try {

      const response = await this.productsService.update(+id, updateProductDto);

      const final_response = {
        'status': 200,
        'product_created': true,
        'data': response
      }

      return final_response;

    } catch (error) {
      return error;
    }

  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

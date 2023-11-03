import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
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
  constructor(private readonly productsService: ProductsService) {}


  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    // console.log("Data producto:", createProductDto);

    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get(':id(\\d+)')
  findOne(@Param('id') id: string ) {
    return this.productsService.findOne( +id );
  }

  @Get('p')
  findByBarcode(@Query('bc') bc: string) {
    // console.log("BC:", +bc);
    return this.productsService.findByBarcode(`${+bc}`);
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

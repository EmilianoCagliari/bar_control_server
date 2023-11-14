import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { BrandsService } from '../service/brands.service';

import { CreateBrandDto } from '../model/dto/create-brand.dto';
import { UpdateBrandDto } from '../model/dto/update-brand.dto';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/model/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';



@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }


  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {



    const response = this.brandsService.create(createBrandDto);

    const final_response = {
      'status': 200,
      'product_created': true,
      'data': response
    }
    return final_response;
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}

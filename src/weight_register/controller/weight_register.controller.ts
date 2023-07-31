import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { WeightRegisterService } from '../service/weight_register.service';

import { CreateWeightRegisterDto } from '../model/dto/create-weight_register.dto';
import { UpdateWeightRegisterDto } from '../model/dto/update-weight_register.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('weight-register')
export class WeightRegisterController {
  constructor(private readonly weightRegisterService: WeightRegisterService) {}

  @Post()
  create(@Body() createWeightRegisterDto: CreateWeightRegisterDto) {
    return this.weightRegisterService.create(createWeightRegisterDto);
  }

  @Get()
  findAll() {
    return this.weightRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightRegisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightRegisterDto: UpdateWeightRegisterDto) {
    return this.weightRegisterService.update(+id, updateWeightRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightRegisterService.remove(+id);
  }
}

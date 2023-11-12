import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException } from '@nestjs/common';

import { WeightRegisterService } from '../service/weight_register.service';

import { CreateWeightRegisterDto } from '../model/dto/create-weight_register.dto';
import { UpdateWeightRegisterDto } from '../model/dto/update-weight_register.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('weight-register')
export class WeightRegisterController {

  constructor(private readonly weightRegisterService: WeightRegisterService) { }

  @Post()
  create(@Body() createWeight: CreateWeightRegisterDto, @Request() _req) {

    try {
      console.log("DATA REGWEIGHT:", createWeight);
      createWeight.user_id = _req.user.userId;

      console.log("DATA REGWEIGHT POST:", createWeight);


      return this.weightRegisterService.create(createWeight);
    } catch (error) {
      return new HttpException(error, 500);
    }


  }

  @Get()
  findAll() {
    return this.weightRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightRegisterService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWeightRegisterDto: UpdateWeightRegisterDto) {
  //   return this.weightRegisterService.update(+id, updateWeightRegisterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.weightRegisterService.remove(+id);
  // }
}

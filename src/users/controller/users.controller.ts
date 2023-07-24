import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';



import { UsersService } from '../service/users.service';

import { PatchUserTransformer } from '../model/transformers/patch-user.transofrmer';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UpdateUserDto } from '../model/dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly patchUserTransformer: PatchUserTransformer) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    console.log('Password SIN Hash', createUserDto.password);

    
    //Password encrypt
    const salt = await bcrypt.genSalt();  
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;

    console.log('Password Hash', createUserDto.password);
    
    const user =  await this.usersService.create(createUserDto);

    if(user == null) {
      throw new HttpException( { msg: 'El email ingresado esta registrado.' }, HttpStatus.BAD_REQUEST);
    }

    //Formatear la estructura de devolucion al generarse un nuevo usuario
    const response: any = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      // role: user.role,
      // isActive: user.isActive,
      // createdAt: user.createdAt,
      // updatedAt: user.updatedAt,
    };

    const final_response = {
      'user_created': true,
      'data': response 
    }

    return final_response;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto ) {
    // const updateUserDto = this.patchUserTransformer.transform(body);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {    
    return this.usersService.remove(+id);
  }
}

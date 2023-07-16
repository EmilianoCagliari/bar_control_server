import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import * as bcrypt from 'bcrypt';



import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../model/dto/create-user.dto';
import { UpdateUserDto } from '../model/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    console.log('Password SIN Hash', createUserDto.password);
    
    //Password encrypt
    const salt = await bcrypt.genSalt();  
    const hash = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hash;

    console.log('Password Hash', createUserDto.password);
    
    return this.usersService.create(createUserDto);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

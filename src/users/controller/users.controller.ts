import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Query, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';



import { UsersService } from '../service/users.service';

import { CreateUserDto } from '../model/dto/create-user.dto';
import { UpdateUserDto } from '../model/dto/update-user.dto';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../model/enum/role.enum';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) { }


  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    try {

      console.log("UserDto:", createUserDto);

      console.log('Password SIN Hash', createUserDto.password);


      //Password encrypt
      const salt = await bcrypt.genSalt();
      console.log("SALT:", salt);
      const hash = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hash;

      console.log('Password Hash', createUserDto.password);

      const user = await this.usersService.create(createUserDto);

      if (user == null) {
        throw new HttpException({ msg: 'El email ingresado esta registrado.' }, HttpStatus.BAD_REQUEST);
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
        'status': 200,
        'user_created': true,
        'data': response
      }

      return final_response;
    } catch (error) {

      return new HttpException(error, 500);
    }

  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findByEmail(@Query('email') email: string) {
    if(email) {
      console.log("Query");
      return this.usersService.findEmail(`${email}`);
    }
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

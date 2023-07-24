import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UpdateUserDto } from '../model/dto/update-user.dto';
import { User } from '../model/entities/user.entity';
import { log } from 'console';
import { Role } from '../model/enum/role.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }


  async create(createUserDto: any) {

    let created = null;
    //verificar si el email esta creado
    const isEmailExists = await this.findEmail(createUserDto.email);

    if (!isEmailExists) {
      created = await this.userModel.create(createUserDto);
    }

    return created
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {

    const user = await this.userModel.findByPk(+id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userModel.findByPk(+id);

    // Exception si no se encuentra el usuario
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (updateUserDto.role) {
      //Exception si no se encuentra el ROLE
      if (!(updateUserDto.role in Role)) {
        throw new NotFoundException('Rol seleccionado invalido');
      }
    }


    const updateUser = await user.update(updateUserDto);

    return updateUser;
  }

  async remove(id: number) {

    const deleted = await this.userModel.destroy({ where: { id: +id } });
    if (!deleted) {
      throw new HttpException({ msg: 'Error al eliminar el registro' }, HttpStatus.BAD_REQUEST);
    }

    return { msg: 'Registro eliminado correctamente' };
    // return `This action removes a #${id} user`;
  }

  //Custom
  async findEmail(email: string) {
    return await this.userModel.findOne({ where: { 'email': `${email}` } });
  }


}



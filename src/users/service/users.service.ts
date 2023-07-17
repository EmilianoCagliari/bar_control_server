import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UpdateUserDto } from '../model/dto/update-user.dto';
import { User } from '../model/entities/user.entity';

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

    const resp = await this.userModel.findByPk(+id);

    console.log("findOne:", resp);
    const user = (resp != null) ? resp : { msg: "Not Found" };

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userModel.findByPk(+id);

    if(!user){
      throw new NotFoundException('User not found');
    }

    return await user.update(updateUserDto);
  }

  async remove(id: number) {

   const deleted = await this.userModel.destroy({ where: { id: +id } });
    if( !deleted ) {
      throw new HttpException( { msg: 'Error al eliminar el registro'}, HttpStatus.BAD_REQUEST);
    }

    return { msg: 'Registro eliminado correctamente'};
    // return `This action removes a #${id} user`;
  }

  //Custom
  async findEmail(email: string) {
    return await this.userModel.findOne({ where: { 'email': `${email}` } });
  }


}



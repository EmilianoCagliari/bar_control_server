import { Injectable } from '@nestjs/common';
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
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {

    const resp = await this.userModel.findByPk(+id);

    const user =  (resp != null) ? resp : { msg: "Not Found" };
    
    return user;
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //Custom
  async findEmail(email: string) {
    return await this.userModel.findOne({ where: { 'email': `${email}` } });
  }


}



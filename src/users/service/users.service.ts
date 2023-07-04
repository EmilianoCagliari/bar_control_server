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


  create(createUserDto: any) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //Custom
  findEmail(email: string) {
    return this.userModel.findOne({ where: { 'email': `${email}` } });
  }


}



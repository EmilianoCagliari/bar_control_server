import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { User } from './model/entities/user.entity';
import { PatchUserTransformer } from './model/transformers/patch-user.transofrmer';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, PatchUserTransformer],
  exports: [UsersService]
})
export class UsersModule {}

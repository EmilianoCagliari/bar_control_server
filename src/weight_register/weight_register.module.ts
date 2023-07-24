import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { WeightRegisterService } from './service/weight_register.service';
import { WeightRegisterController } from './controller/weight_register.controller';
import { WeightRegister } from './model/entities/weight_register.entity';

@Module({
  imports: [SequelizeModule.forFeature([WeightRegister])],
  controllers: [WeightRegisterController],
  providers: [WeightRegisterService],
  exports: [WeightRegisterService]
})
export class WeightRegisterModule { }

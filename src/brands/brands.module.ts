import { Module } from '@nestjs/common';
import { BrandsService } from './service/brands.service';
import { BrandsController } from './controller/brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './model/entities/brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService]
})
export class BrandsModule {}

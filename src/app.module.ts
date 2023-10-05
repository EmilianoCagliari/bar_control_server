import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User } from './users/model/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './dbAdmin/seed.service';
import { BrandsModule } from './brands/brands.module';
import { WeightRegisterModule } from './weight_register/weight_register.module';
import { Product } from './products/model/entities/product.entity';
import { WeightRegister } from './weight_register/model/entities/weight_register.entity';
import { Brand } from './brands/model/entities/brand.entity';
import { ScaleGateway } from './websockets/scale/gateway.scale';
import { ScaleService } from './websockets/scale/service.scale';

@Module({
  imports: [

    // Config Data (dotenv)
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env.local'
    }),
    
    // Database Data
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      // sync: {
      //   force: true  // Delete and create database
      // },
      // synchronize: true,
      models: [
        User,
        Product,
        Brand,
        WeightRegister
      ],      
    }),

    UsersModule,
    ProductsModule,
    AuthModule,
    BrandsModule,
    WeightRegisterModule
  ],
  controllers: [],
  providers: [
    SeedService, ScaleGateway, ScaleService
  ],
})
export class AppModule { }

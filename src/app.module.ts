import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

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
      models: [
        User
      ],      
    }),
    UsersModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

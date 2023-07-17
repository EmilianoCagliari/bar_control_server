import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Utiliza lista blanca para permitir campos estrictamente indicados en los DTO, los que no esten no se podran modificar.
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true})
  )
  await app.listen(3000);
}
bootstrap();

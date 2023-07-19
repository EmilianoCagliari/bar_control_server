import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './dbAdmin/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Utiliza lista blanca para permitir campos estrictamente indicados en los DTO, los que no esten no se podran modificar.
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true})
  )

  const seedService = app.get(SeedService); // Obtén una instancia del servicio SeedService

  await seedService.seedData(); // Ejecuta la función seedData() al inicio de la aplicación

  await app.listen(3000);
}
bootstrap();

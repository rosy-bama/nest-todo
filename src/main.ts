import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

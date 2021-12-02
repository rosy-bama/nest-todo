import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { UsersHelper } from 'src/helpers/users.helper';
import { PrismaService } from 'src/services/prisma.service';
import { UserMiddleware } from 'src/middlewares/user.middleware';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersHelper, UsersService],
  exports: [UsersService, UsersHelper]
})
export class UsersModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(UserMiddleware)
      .forRoutes(UsersController);
  }
}

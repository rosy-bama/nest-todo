import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { UserHelper } from 'src/helpers/users.helper';
import { PrismaService } from 'src/services/prisma.service';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { UserValidator } from 'src/validators/user.validator';

@Module({
  controllers: [UsersController],
  providers: [UserValidator, PrismaService, UserHelper, UsersService]
})
export class UsersModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(UserMiddleware)
      .forRoutes(UsersController);
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { UserHelper } from 'src/helpers/users.helper';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UserHelper, UsersService]
})
export class UsersModule {}

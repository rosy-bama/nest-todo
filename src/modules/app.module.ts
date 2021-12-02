import { Module } from '@nestjs/common';
import { UsersHelper } from 'src/helpers/users.helper';
import { AuthService } from 'src/services/auth.service';
import { PrismaService } from 'src/services/prisma.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';
import { TodosModule } from './todos.module';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [AuthModule, UsersModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/controllers/auth.controller';
import { LocalStrategy } from 'src/guards/local.strategy';
import { UsersHelper } from 'src/helpers/users.helper';
import { PrismaService } from 'src/services/prisma.service';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/enums/constants';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto} from '../dto/update-user.dto';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get()
  async findAll(): Promise<User[] | object> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<User|object> {
    return await this.usersService.findOne(uuid);
  }

  @Get()
  async findByUsername(@Query('username') username: string): Promise<User[] | object> {
    return await this.usersService.findbyUsername(username);
  }

  @Patch(':id')
  async update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(uuid, updateUserDto);
  }

  @Patch('reset-password/:id')
  async reset(@Param('uuid', ParseIntPipe) uuid: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return await this.usersService.resetPassword(+uuid, updatePasswordDto);
  }

  @Delete(':id')
  async remove(@Param('uuid', ParseIntPipe) uuid: string) {
    return await this.usersService.remove(+uuid);
  }
}

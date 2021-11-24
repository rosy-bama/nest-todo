import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto} from '../dto/update-user.dto';
import { User } from '.prisma/client';

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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User|object> {
    return await this.usersService.findOne(+id);
  }

  @Get()
  async findByUsername(@Query('username') username: string): Promise<User[] | object> {
    return await this.usersService.findbyUsername(username);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('reset-password/:id')
  reset(@Param('id', ParseIntPipe) id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.resetPassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}

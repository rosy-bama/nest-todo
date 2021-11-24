import { Module } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { TodosController } from '../controllers/todos.controller';
import { TodoHelper } from 'src/helpers/todos.helper';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [TodosController],
  providers: [PrismaService, TodoHelper,TodosService]
})
export class TodosModule {}

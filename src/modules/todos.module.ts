import { Module } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { TodosController } from '../controllers/todos.controller';

@Module({
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}

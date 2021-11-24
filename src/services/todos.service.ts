import { Injectable } from '@nestjs/common';
import { TodoHelper } from 'src/helpers/todos.helper';
import { Todo } from 'src/interfaces/todo.interface';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly todoHelper: TodoHelper){}

  
  async create(createTodoDto: CreateTodoDto){
    return await this.todoHelper.createTodo(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoHelper.getAllTodos();
  }

  async findOneById(id: number): Promise<Todo> {
    return await this.todoHelper.getOneById(id);
  }

  async findOneByTitle(title: string): Promise<Todo> {
    return await this.todoHelper.getOneByTitle(title);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

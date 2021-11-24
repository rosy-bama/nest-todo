import { Todo } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "src/dto/create-todo.dto";
import { UpdateTodoDto } from "src/dto/update-todo.dto";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class TodoHelper {

    constructor(private readonly prismaService: PrismaService){}

    async createTodo(todo: CreateTodoDto){
        return await this.prismaService.todo.create({
            data: todo
        });
    }

    async getAllTodos(): Promise<Todo[]>{
        const todos = await this.prismaService.todo.findMany();

        this.prismaService.$disconnect();

        return todos;
    }

    async getOneById(id: number):Promise<Todo>{
        const todo = await this.prismaService.todo.findUnique({
            where: {
                id: id
            }
        }) 

        this.prismaService.$disconnect()

        return todo;
    }

    async getOneByTitle(title: string):Promise<Todo>{
        const todo = await this.prismaService.todo.findFirst({
            where: {
                title: title
            }
        }) 

        this.prismaService.$disconnect()

        return todo;
    }

    async updateTodo(id: number, data:UpdateTodoDto): Promise<Todo>{
        return await this.prismaService.todo.update({
            data: data,
            where: {
                id: id
            }
        });

    }
}
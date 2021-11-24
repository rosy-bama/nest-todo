import { PartialType } from '@nestjs/mapped-types';
import { IsAlphanumeric } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsAlphanumeric()
    title?: string;

    @IsAlphanumeric()
    content?: string;
}

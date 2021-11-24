import { IsAlphanumeric } from "class-validator";

export class CreateTodoDto {
    @IsAlphanumeric()
    title: string;

    @IsAlphanumeric()
    content: string;

    userId: number;

}

import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, minLength } from "class-validator";

export class CreateUserDto {
    @IsAlpha()
    firstname: string;
    
    @IsAlpha()
    lastname: string;

    @IsEmail()
    email: string;

    @IsAlphanumeric()
    password: string;
}

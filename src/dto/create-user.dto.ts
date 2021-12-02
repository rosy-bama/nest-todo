import { IsAlpha, IsAlphanumeric, IsEmail, IsOptional, IsUUID } from "class-validator";

export class CreateUserDto {

    @IsOptional()
    @IsUUID()
    publicId: string;

    @IsAlpha()
    firstname: string;
    
    @IsAlpha()
    lastname: string;

    @IsEmail()
    email: string;

    @IsAlphanumeric()
    password: string;
}

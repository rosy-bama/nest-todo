import { PartialType } from '@nestjs/mapped-types';
import { IsAlphanumeric, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    firstname: string;

    @IsOptional()
    lastname: string;

    @IsOptional()
    email: string;
}

export class UpdatePasswordDto extends PartialType(CreateUserDto){
    @IsAlphanumeric()
    password: string;

    @IsAlphanumeric()
    newPassword: string;

    @IsAlphanumeric()
    confirmPassword
} 

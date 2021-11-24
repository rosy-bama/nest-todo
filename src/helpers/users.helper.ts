import { User } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { PrismaService } from "../services/prisma.service";


@Injectable()
export class UserHelper {
    constructor(private readonly prismaService: PrismaService){}


    async createUser(user : CreateUserDto): Promise<User>{
        return await this.prismaService.user.create({
            data: user
        });
    }


    async getAll(): Promise<User[]>{
        const users = await this.prismaService.user.findMany();

        this.prismaService.$disconnect();

        return users;
    }

    async getOneById(id): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id : id
            }
        });
        
        this.prismaService.$disconnect();

        return user;
    }
 
    async getByUsername(username): Promise<User[]>{
        const users = this.prismaService.user.findMany({
            where: {
                OR: [
                    {
                        firstname: username
                    },
                    {
                        lastname: username
                    }
                ]
            }
        });

        this.prismaService.$disconnect();

        return users;
    }

    async getByEmail(email: string): Promise<User>{
        const user = this.prismaService.user.findUnique({
            where: {
                email: email
            }
        });

        this.prismaService.$disconnect();

        return user;
    }

    async updateUser(id: number, data: UpdateUserDto): Promise<User|object>{
        const user = this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (user){
            return {"Message" : "Email already in Use"}
        }
        return this.prismaService.user.update({
            data: data,
            where: { id: id}
        });
    }

    async resetPassword(id: number, data: object): Promise<User|object>{
        return this.prismaService.user.update({
            data: data,
            where: {id: id}
        })
    }

    async deleteUser(id:number): Promise<User>{
    return this.prismaService.user.delete({
        where: {
            id: id
        }
    })
    }

}
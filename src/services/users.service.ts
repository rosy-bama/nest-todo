import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { UsersHelper } from 'src/helpers/users.helper';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from '../dto/update-user.dto';
import { Constants } from 'src/enums/constants.enum';
import { hashPassword } from 'src/helpers/password.helper';
import { use } from 'passport';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly userHelper: UsersHelper){}

  async create(createUserDto: CreateUserDto) {
    const pwdHash = await hashPassword(createUserDto.password);
    createUserDto.password = pwdHash;

    createUserDto.publicId = randomUUID();    

    const {id, password, ...user} = await this.userHelper.createUser(createUserDto);

    return user;
  }

  
  async findAll(): Promise<User[]| object>{
    const users = await this.userHelper.getAll();

    if(users[0]){
      return users;
    }
    return {"Message": "No user exist in the database"}
  }

  async findOne(uuid: string): Promise<User | object>  {
    const user = await this.userHelper.getOneById(uuid);
    
    if(user){
      return user
    }
    return {"Message": "User Not Found"};
  }

  async findbyUsername(username): Promise<User[] | object>{
    if(isEmail(username)){
      const user = await this.userHelper.getByEmail(username);
      if (user){
        return user;
      }
      return {"Message" : "User Not Found"};
    }
    const user = await this.userHelper.getByUsername(username);
    if (user){ // Code refactoring needed to avoid repetition
      return user;
    }
    return {"Message" : "User Not Found"};
  }


  async update(uuid: string, updateUserDto: UpdateUserDto): Promise<User | object> {
    return await this.userHelper.updateUser(uuid, updateUserDto);
  }

  async resetPassword(id: number, payload: UpdatePasswordDto): Promise<User|object>{
    const user: User = await this.userHelper.getOneById(id);
    const isMatch = await bcrypt.compare(payload.password, user.password);

    if(isMatch){
      const saltOrRounds = Constants.BCRYPT_SALT_ROUNDS;
      const hash = await bcrypt.hash(payload.newPassword, saltOrRounds)
      
      payload.password = hash
      const newPayload: object = { "password": payload.password}
      return await this.userHelper.resetPassword(id, newPayload);
    }
    return {"Message" : "Incorrect Password"}
  }


  async remove(id: number) {
    return await this.userHelper.deleteUser(id);
  }
}

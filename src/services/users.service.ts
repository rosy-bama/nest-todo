import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { UserHelper } from 'src/helpers/users.helper';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from '../dto/update-user.dto';
import { Constants } from 'src/enums/constants.enum';
import { hashPassword } from 'src/helpers/password.helper';

@Injectable()
export class UsersService {
  constructor(private readonly userHelper: UserHelper){}


  async create(createUserDto: CreateUserDto) {
    const pwdHash = await hashPassword(createUserDto.password);
    createUserDto.password = pwdHash;
    const {password, ...user} = await this.userHelper.createUser(createUserDto);

    return user;
  }

  
  async findAll(): Promise<User[]| object>{
    const users = await this.userHelper.getAll();

    if(users[0]){
      return users;
    }

    return {"Message": "No user exist in the database"}
    
  }

  async findOne(id: number): Promise<User | object>  {
    const user = await this.userHelper.getOneById(id);
    
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
    const user = await this. userHelper.getByUsername(username);
    if (user){ // Code refactoring needed to avoid repetition
      return user;
    }
    return {"Message" : "User Not Found"};
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | object> {
    return await this.userHelper.updateUser(id, updateUserDto);
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


  remove(id: number) {
    return this.userHelper.deleteUser(id);
  }
}

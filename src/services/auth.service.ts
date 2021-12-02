import { User } from '../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { checkPassword } from 'src/helpers/password.helper';
import { UsersHelper } from 'src/helpers/users.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly usersHelper: UsersHelper,
        private jwtService: JwtService
    ){}

    async validateUser(payload){        
        const user = await this.usersHelper.getByEmail(payload); // username is email
        
        if ( user && await checkPassword( payload.password, user.password)){
            const { id, password, ...result} = user;
            return result;
        }
        return user;
    }

    login(user: User): any{
        const payload = { username: user.email, sub: user.publicId };
        return { access_token: this.jwtService.sign(payload)};

    }
}

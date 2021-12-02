
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor( private authService: AuthService){
        super({ usernameField: 'email' });
    }

    async validate(payload: LoginDto) : Promise<any>{
        const user = await this.authService.validateUser(payload);
        
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
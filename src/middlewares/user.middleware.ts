import { BadRequestException, ConsoleLogger, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction} from "express";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UsersHelper } from "src/helpers/users.helper";

const Joi = require('joi');


@Injectable()
export class UserMiddleware implements NestMiddleware{
    constructor(private readonly usersHelper: UsersHelper){}

    async use(req: Request, res: Response, next: NextFunction){     
    if (req.url === '/users' && req.method === 'POST') {
            const schema = Joi.object({
                firstname: Joi.string().min(4).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
                lastname: Joi.string().min(4).pattern(new RegExp(/^[A-Za-z]+$/)).required(),
                email: Joi.string().min(8).pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)).required(),
                password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
            });
            
            try {
                await schema.validateAsync(req.body);
                
                if (await this.usersHelper.isExisting(req.body.email)){
                    throw new BadRequestException("Email Already In Use")
                } else { next(); }
            }
            catch (err) {
                throw new BadRequestException(err.message)
            }
            
        } else if (req.url === '/users/login' && req.method === 'POST'){
            console.log("not /users and POST ..................... 2");
        }
    }
}

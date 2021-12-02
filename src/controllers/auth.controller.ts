import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "src/dto/login.dto";
import { AuthService } from "src/services/auth.service";
import { LocalAuthGuard } from '../guards/local-auth.guard';


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body): Promise<LoginDto>{
        return this.authService.login(body)
    }
} 
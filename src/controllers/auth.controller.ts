import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "src/dto/login.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Body() body){
        return body;
    }
} 
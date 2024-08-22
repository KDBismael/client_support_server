import { Controller, Get, Logger, Post, Request, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.gaurd';
import { LocalAuthGuard } from './guards/local-auth.gaurd';
@Controller('auth')
export class AuthController {
    logger: Logger;
    constructor(
        private readonly authService: AuthService,
    ) {
        this.logger = new Logger(AuthController.name);
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        try {
            return await this.authService.generateJwtToken(req.user);
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("viewProfile")
    async getUser(@Request() req): Promise<any> {
        return req.user;
    }
}
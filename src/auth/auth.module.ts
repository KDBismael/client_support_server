import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwtStrategy';
import { LocalStrategy } from './strategies/localStrategy';

@Module({
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService],
    imports: [
        JwtModule.register({
            secret: "JWT_SECRET",
            signOptions: { expiresIn: "3000s" },
        }),
        forwardRef(() => UserModule),
        PassportModule,
    ],
    controllers: [AuthController],
})

export class AuthModule { }

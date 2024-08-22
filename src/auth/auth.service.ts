import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UserService)) private userService: UserService, private jwtService: JwtService) { }
    async getHashedPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    }
    async validateUser(email: string, pass: string): Promise<any> {
        const query = { email: email };
        const user = await this.userService.findOne(query);
        if (!user) throw new NotFoundException("Email Does not exist");
        const isMatched = await this.comparePasswords(pass, user.password);
        if (!isMatched) throw new UnauthorizedException("Invalid Password");
        return user;
    }
    //compare password
    async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<any> {
        return bcrypt
            .compare(password, hashedPassword)
            .then((isMatch) => {
                if (isMatch) return true;
                return false;
            })
            .catch((err) => err);
    }
    async generateJwtToken(user: any) {
        const payload = {
            email: user.email
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

// auth.service.ts

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
    IAuthServiceFinishRefreshToken,
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
    IAuthServiceLoginOut,
    IAuthServiceRestoreAccessToken,
    IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, //

        private readonly usersService: UsersService,
    ) {}

    async login({
        email,
        password,
        context,
    }: IAuthServiceLogin): Promise<string> {
        const user = await this.usersService.findOneByEmail({ email });

        if (!user) throw new UnprocessableEntityException('there is no email.');

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException('wrong password.');

        this.setRefreshToken({ user, context });

        return this.getAccessToken({ user });
    }

    async loginout({ context }: IAuthServiceLoginOut): Promise<boolean> {
        this.finishRefreshToken({ context });

        return true;
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user });
    }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { sub: user.id },
            { secret: process.env.JWT_ACCESS_TOKEN, expiresIn: '20s' },
        );
    }

    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            { secret: process.env.JWT_REFRESH_TOKEN, expiresIn: '2w' },
        );

        context.res.setHeader(
            'set-Cookie',
            `refreshToken=${refreshToken}; path=/;`,
        );
        // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
        // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
    }

    finishRefreshToken({ context }: IAuthServiceFinishRefreshToken): void {
        const refreshToken = this.jwtService.sign({
            secret: process.env.JWT_REFRESH_TOKEN,
            expiresIn: '0s',
        });
        context.res.setHeader(
            'set-Cookie',
            `refreshToken=${refreshToken}; path=/;`,
        );
    }
}

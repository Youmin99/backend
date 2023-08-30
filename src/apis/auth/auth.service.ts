// auth.service.ts

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
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

    async login({ email, password,context }: IAuthServiceLogin): Promise<string> {

        const user = await this.usersService.findOneByEmail({ email });

        if (!user) throw new UnprocessableEntityException('there is no email.');

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException('wrong password.');

        this.setRefreshToken({ user, context });

        return this.getAccessToken({ user });
    }

    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
        return this.getAccessToken({ user });
      }

    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { sub: user.id },
            { secret: 'mypassword', expiresIn: '1h' },
        );
    }

    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
        const refreshToken = this.jwtService.sign(
          { sub: user.id },
          { secret: 'myrefresh', expiresIn: '2w' },
        );

    context.res.setHeader(
        'set-Cookie',
        `refreshToken=${refreshToken}; path=/;`,
      );
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`);
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com');
    }

}
    // restoreAccessToken

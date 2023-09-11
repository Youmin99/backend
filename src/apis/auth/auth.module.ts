// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/Token.entity';

@Module({
    imports: [
        JwtModule.register({}),
        UsersModule, //
        TypeOrmModule.forFeature([
            Token, //
        ]),
    ],
    providers: [
        JwtAccessStrategy,
        JwtRefreshStrategy,
        AuthResolver, //
        AuthService,
    ],
})
export class AuthModule {}

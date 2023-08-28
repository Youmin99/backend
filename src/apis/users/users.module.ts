// users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, //
        ]),
    ],

    providers: [
        UsersResolver, //
        UsersService,
    ],

    exports: [
        UsersService, // 추가
    ],
})
export class UsersModule {}

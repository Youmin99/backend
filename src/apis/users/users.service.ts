// users.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
    IUsersServiceCreate,
    IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/interfaces/context';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create({
        email,
        password,
        name,
        phone,
    }: IUsersServiceCreate): Promise<User> {
        const user = await this.findOneByEmail({ email });
        if (user) throw new ConflictException('already using email');

        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersRepository.save({
            email,
            password: hashedPassword,
            name,
            phone,
        });
    }

   async check(user:IContext){
    return await this.usersRepository.findOne({ where: { id: user.req.user.id }});
    }
}

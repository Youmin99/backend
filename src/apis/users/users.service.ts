// users.service.ts

import {
    ConflictException,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
    IUsersServiceCreate,
    IUsersServiceDelete,
    IUsersServiceFindOneByEmail,
    IUsersServiceUpdate,
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

    async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
        const user = await this.findOneByEmail({
            email: createUserInput.email,
        });
        if (user) throw new ConflictException('already using email');

        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        return this.usersRepository.save({
            ...createUserInput,
            password: hashedPassword,
        });
    }

    async update({ updateUserInput }: IUsersServiceUpdate): Promise<User> {
        const user = await this.findOneByEmail({
            email: updateUserInput.email,
        });

        const result = this.usersRepository.save({
            ...user,
            ...updateUserInput,
        });
        return result;
    }

    async delete({ email, password }: IUsersServiceDelete): Promise<boolean> {
        const user = await this.findOneByEmail({ email });

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException('wrong password.');

        const result = await this.usersRepository.softDelete({
            email,
        });
        return result.affected ? true : false;
    }

    async check(user: IContext) {
        return await this.usersRepository.findOne({
            where: { _id: user.req.user._id },
        });
    }
}

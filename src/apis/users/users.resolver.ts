// users.resolver.ts

import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';
import { CreateUserInput } from './dto/create-users.input';
import { UpdateUserInput } from './dto/update-users.input';

@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService, //
    ) {}

    @UseGuards(GqlAuthGuard('access'))
    @Query(() => User)
    fetchUserLoggedIn(
        @Context() context: IContext, //
    ): Promise<User> {
        return this.usersService.check(context);
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        return this.usersService.create({ createUserInput });
    }

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => User)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<User> {
        return this.usersService.update({ updateUserInput });
    }

    @UseGuards(GqlAuthGuard('access'))
    @Mutation(() => Boolean)
    deleteUser(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<boolean> {
        return this.usersService.delete({ email, password });
    }
}

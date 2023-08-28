// users.resolver.ts

import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService, //
    ) {}

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    fetchUser(
        @Context() context: IContext, //
    ): string {

        console.log(context.req.user);
        return '';
    }

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args({ name: 'phone', type: () => Int }) phone: number,
    ): Promise<User> {
        return this.usersService.create({ email, password, name, phone });
    }
}

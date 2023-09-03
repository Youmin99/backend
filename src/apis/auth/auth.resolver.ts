// auth.resolver.ts

import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService, //
    ) {}

    @Mutation(() => String)
    async loginUser(
        @Args('email') email: string, //
        @Args('password') password: string,
        @Context() context: IContext,
    ): Promise<string> {
        return this.authService.login({ email, password, context });
    }

    @Mutation(() => Boolean)
    async logoutUser(@Context() context: IContext): Promise<boolean> {
        return this.authService.loginout({ context });
    }

    @UseGuards(GqlAuthGuard('refresh'))
    @Mutation(() => String)
    restoreAcessToken(
        @Context() context: IContext, //
    ): string {
        return this.authService.restoreAccessToken({ user: context.req.user });
    }
}

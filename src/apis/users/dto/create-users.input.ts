// create-board.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    phone: number;
}

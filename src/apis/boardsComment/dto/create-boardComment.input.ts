// create-board.input.ts

import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateBoardCommentInput {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    contents: string;

    @Field(() => Float)
    rating: number;
}

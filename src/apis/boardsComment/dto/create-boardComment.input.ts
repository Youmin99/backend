// create-board.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardCommentInput {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    contents: string;

    @Field(() => String)
    youtubeUrl: string;
}

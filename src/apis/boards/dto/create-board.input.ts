// create-board.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { BoardAddressInput } from 'src/apis/boardsAddress/dto/boardsAddress.input';

@InputType()
export class CreateBoardInput {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    contents: string;

    @Field(() => String, { nullable: true })
    youtubeUrl: string;

    @Field(() => Int, { nullable: true })
    likeCount: number;

    @Field(() => Int, { nullable: true })
    dislikeCount: number;

    @Field(() => BoardAddressInput, { nullable: true })
    boardAddress: BoardAddressInput;

    @Field(() => [String], { nullable: true })
    images: string[];
}

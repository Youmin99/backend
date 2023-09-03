// create-board.input.ts

import { InputType, Field } from '@nestjs/graphql';
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

    @Field(() => String)
    youtubeUrl: string;

    @Field(() => BoardAddressInput)
    boardAddress: BoardAddressInput;
}

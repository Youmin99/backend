// updateProduct.input.ts
import { InputType, PickType } from '@nestjs/graphql';
import { CreateBoardCommentInput } from './create-boardComment.input';

@InputType()
export class UpdateBoardCommentInput extends PickType(CreateBoardCommentInput, [
    'contents',
    'rating',
]) {}

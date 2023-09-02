// updateProduct.input.ts
import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardCommentInput } from './create-boardComment.input';

@InputType()
export class UpdateBoardCommentInput extends PartialType(
    CreateBoardCommentInput,
) {}

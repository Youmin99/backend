// updateProduct.input.ts
import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateBoardInput } from './create-board.input';

@InputType()
export class UpdateBoardInput extends OmitType(
    CreateBoardInput,
    ['password'],
    InputType,
) {}

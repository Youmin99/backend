// productSaleslocation.input.ts

import { InputType, OmitType } from '@nestjs/graphql';
import { BoardAddress } from '../entities/boardAddress.entity';

@InputType()
export class BoardAddressInput extends OmitType(
    BoardAddress,
    ['_id'],
    InputType,
) {}

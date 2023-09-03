// boards.module.ts

import { Module } from '@nestjs/common';
import { BoardsResolver } from './borads.resolver';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardAddressService } from '../boardsAddress/boardsAddress.service';
import { BoardAddress } from '../boardsAddress/entities/boardAddress.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Board, //
            BoardAddress,
        ]),
    ],
    providers: [
        BoardsResolver, //
        BoardsService,
        BoardAddressService,
    ],
})
export class BoardsModule {}

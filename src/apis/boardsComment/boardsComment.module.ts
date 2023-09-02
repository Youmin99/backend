// boards.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardComment } from './entities/boardComment.entity';
import { BoardsCommentResolver } from './boradsComment.resolver';
import { BoardsCommentService } from './boardsComment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardComment, //
        ]),
    ],
    providers: [
        BoardsCommentResolver, //
        BoardsCommentService,
    ],
})
export class BoardsCommentModule {}

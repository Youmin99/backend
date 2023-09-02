// boards.service.ts

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BoardComment } from './entities/boardComment.entity';
import {
    IBoardsCommentServiceCreate,
    IBoardsCommentServiceDelete,
    IBoardsCommentServiceUpdate,
} from './interfaces/boardsComment-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsCommentService {
    constructor(
        @InjectRepository(BoardComment)
        private readonly boardCommentsRepository: Repository<BoardComment>, //
    ) {}

    async create({
        boardId,
        createBoardCommentInput,
    }: IBoardsCommentServiceCreate): Promise<BoardComment> {
        return await this.boardCommentsRepository.save({
            ...createBoardCommentInput,
        });
    }

    async update({
        boardCommentId,
        password,
        updateBoardCommentInput,
    }: IBoardsCommentServiceUpdate): Promise<BoardComment> {
        const boardComment = await this.boardCommentsRepository.findOne({
            where: { id: boardCommentId },
        });

        if (password !== boardComment.password)
            throw new UnprocessableEntityException('wrong password.');

        const result = this.boardCommentsRepository.save({
            ...boardComment,
            ...updateBoardCommentInput,
        });
        return result;
    }

    async delete({
        password,
        boardCommentId,
    }: IBoardsCommentServiceDelete): Promise<boolean> {
        const boardComment = await this.boardCommentsRepository.findOne({
            where: { id: boardCommentId },
        });

        if (password !== boardComment.password)
            throw new UnprocessableEntityException('wrong password.');

        const result = await this.boardCommentsRepository.softDelete({
            id: boardCommentId,
        });

        return result.affected ? true : false;
    }
}

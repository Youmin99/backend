// boards.service.ts

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BoardComment } from './entities/boardComment.entity';
import {
    IBoardsCommentServiceCreate,
    IBoardsCommentServiceDelete,
    IBoardsCommentServiceFinds,
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

    async findAll({
        boardId,
        page = 1,
    }: IBoardsCommentServiceFinds): Promise<BoardComment[]> {
        const take = 10;

        return this.boardCommentsRepository.find({
            where: {
                board: {
                    _id: boardId,
                },
            },
            take,
            skip: (page - 1) * take,
        });
    }

    async create({
        boardId,
        createBoardCommentInput,
    }: IBoardsCommentServiceCreate): Promise<BoardComment> {
        return await this.boardCommentsRepository.save({
            ...createBoardCommentInput,
            board: {
                _id: boardId,
            },
        });
    }

    async update({
        boardCommentId,
        password,
        updateBoardCommentInput,
    }: IBoardsCommentServiceUpdate): Promise<BoardComment> {
        const boardComment = await this.boardCommentsRepository.findOne({
            where: { _id: boardCommentId },
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
            where: { _id: boardCommentId },
        });

        if (password !== boardComment.password)
            throw new UnprocessableEntityException('wrong password.');

        const result = await this.boardCommentsRepository.softDelete({
            _id: boardCommentId,
        });

        return result.affected ? true : false;
    }
}

// boards.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import {
    IBoardsServiceCreate,
    IBoardsServiceDelete,
    IBoardsServiceFindOne,
    IBoardsServiceUpdate,
} from './interfaces/boards-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardAddressService } from '../boardsAddress/boardsAddress.service';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardsRepository: Repository<Board>, //
        private readonly boardAddressService: BoardAddressService,
    ) {}

    findAll(): Promise<Board[]> {
        return this.boardsRepository.find({
            relations: ['boardAddress'],
        });
    }

    findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
        return this.boardsRepository.findOne({
            where: { _id: boardId },
            relations: ['boardAddress'],
        });
    }

    boardsCount(): Promise<number> {
        return this.boardsRepository.count();
    }

    async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
        const { boardAddress, ...product } = createBoardInput;

        const result = await this.boardAddressService.create({
            ...boardAddress,
        });

        return await this.boardsRepository.save({
            ...product,
            boardAddress: result,
        });
    }

    async update({
        boardId,
        updateBoardInput,
    }: IBoardsServiceUpdate): Promise<Board> {
        const product = await this.findOne({ boardId });

        const result = this.boardsRepository.save({
            ...product,
            ...updateBoardInput,
        });
        return result;
    }

    async delete({ boardId }: IBoardsServiceDelete): Promise<boolean> {
        const result = await this.boardsRepository.softDelete({
            _id: boardId,
        });
        return result.affected ? true : false;
    }
}

// boards.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate, IBoardsServiceDelete, IBoardsServiceFindOne, IBoardsServiceUpdate } from './interfaces/boards-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private readonly boardsRepository: Repository<Board>, //
    ) {}

    findAll(): Promise<Board[]> {
        return this.boardsRepository.find();
    }

    findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
        return this.boardsRepository.findOne({ where: { id: boardId }});
    }

    boardsCount(): Promise<number> {
        return this.boardsRepository.count();
    }

    async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
        return await this.boardsRepository.save({...createBoardInput});  
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

    async delete({ boardId }: IBoardsServiceDelete):Promise<boolean> {

        const result = await this.boardsRepository.softDelete({
            id: boardId,
        }); 
        return result.affected ? true : false;  
    }


    
}

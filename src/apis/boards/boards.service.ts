// boards.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate, IBoardsServiceFindOne } from './interfaces/boards-service.interface';
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

    create({ createBoardInput }: IBoardsServiceCreate): string {
        // 1. 브라우저에서 보내준 데이터 확인하기
        console.log(createBoardInput.writer);
        console.log(createBoardInput.title);
        console.log(createBoardInput.contents);

        // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
        //

        // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
        return '게시물 등록에 성공하였습니다!!';
    }
}

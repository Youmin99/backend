// boards.service.ts
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Board } from './entities/board.entity';
import {
    IBoardsServiceCounts,
    IBoardsServiceCreate,
    IBoardsServiceDelete,
    IBoardsServiceFindOne,
    IBoardsServiceFinds,
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

    async findAll({ search, page = 1 }: IBoardsServiceFinds): Promise<Board[]> {
        const take = 10;

        return this.boardsRepository.find({
            where: { title: search },
            relations: ['boardAddress'],
            take,
            skip: (page - 1) * take,
        });
    }

    findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
        return this.boardsRepository.findOne({
            where: { _id: boardId },
            relations: ['boardAddress'],
        });
    }

    boardsCount({ search }: IBoardsServiceCounts): Promise<number> {
        return this.boardsRepository.count({ where: { title: search } });
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
        password,
        updateBoardInput,
    }: IBoardsServiceUpdate): Promise<Board> {
        const board = await this.findOne({ boardId });

        if (!board)
            throw new UnprocessableEntityException('there is no board.');

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth) throw new UnprocessableEntityException('wrong password.');

        if (product.password === password)
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

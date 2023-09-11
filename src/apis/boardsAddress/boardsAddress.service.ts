import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardAddress } from './entities/boardAddress.entity';
import { BoardAddressInput } from './dto/boardsAddress.input';

@Injectable()
export class BoardAddressService {
    constructor(
        @InjectRepository(BoardAddress)
        private readonly boardsAddressRepository: Repository<BoardAddress>,
    ) {}

    create({ ...boardAddressInput }: BoardAddressInput) {
        return this.boardsAddressRepository.save({
            ...boardAddressInput,
        });
    }

    update({ ...boardAddressInput }: BoardAddressInput) {
        return this.boardsAddressRepository.save({
            ...boardAddressInput,
        });
    }
}

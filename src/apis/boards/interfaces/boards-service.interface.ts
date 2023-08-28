// boards-services.interface.ts

import { CreateBoardInput } from '../dto/create-board.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceCreate {
    createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceFindOne {
    boardId: string;
}

export interface IBoardsServiceDelete {
    boardId: string;
}

export interface IBoardsServiceUpdate {
    boardId: string;
    updateBoardInput: UpdateBoardInput;
}
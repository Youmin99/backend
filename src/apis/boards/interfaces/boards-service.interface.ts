// boards-services.interface.ts

import { CreateBoardInput } from '../dto/create-board.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceCreate {
    createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceFinds {
    search: string;
    page: number;
}

export interface IBoardsServiceFindOne {
    boardId: string | CreateBoardInput['writer'];
}

export interface IBoardsServiceCounts {
    search: string;
}

export interface IBoardsServiceDelete {
    boardId: string;
}

export interface IBoardsLike {
    boardId: string;
}

export interface IBoardsServiceUpdate {
    boardId: string;
    password: string;
    updateBoardInput: UpdateBoardInput;
}

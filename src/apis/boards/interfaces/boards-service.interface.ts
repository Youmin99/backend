// boards-services.interface.ts

import { CreateBoardInput } from '../dto/create-board.input';

export interface IBoardsServiceCreate {
    createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceFindOne {
    boardId: string;
}
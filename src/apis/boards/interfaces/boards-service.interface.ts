// boards-services.interface.ts

import { write } from 'fs';
import { CreateBoardInput } from '../dto/create-board.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceCreate {
    createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceFindOne {
    boardId: string | CreateBoardInput['writer'];


}

export interface IBoardsServiceDelete {
    boardId: string;
}

export interface IBoardsServiceUpdate {
    boardId: string;
    updateBoardInput: UpdateBoardInput;
}

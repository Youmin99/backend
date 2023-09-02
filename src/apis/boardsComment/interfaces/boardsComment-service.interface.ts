// boards-services.interface.ts

import { CreateBoardCommentInput } from '../dto/create-boardComment.input';
import { UpdateBoardCommentInput } from '../dto/update-boardComment.input';

export interface IBoardsCommentServiceCreate {
    boardId: string;
    createBoardCommentInput: CreateBoardCommentInput;
}

export interface IBoardsCommentServiceFindOne {
    boardId: string;
}

export interface IBoardsCommentServiceDelete {
    boardCommentId: string;
    password: string;
}

export interface IBoardsCommentServiceUpdate {
    boardCommentId: string;
    password: string;
    updateBoardCommentInput: UpdateBoardCommentInput;
}

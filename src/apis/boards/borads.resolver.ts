// boards.resolver.ts
import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => [Board])
    fetchBoards(): Promise<Board[]> {
        return this.boardsService.findAll();
    }

    @Query(() => Board)
    fetchBoard(@Args('boardId') boardId: string): Promise<Board> {
        return this.boardsService.findOne({ boardId });
    }

    @Query(() => Int)
    fetchBoardsCount(): Promise<number> {
        return this.boardsService.boardsCount();
    }

    @Mutation(() => Board)
    createBoard(
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ): Promise<Board> {
        return this.boardsService.create({ createBoardInput });
    }

    @Mutation(() => Board)
    async updateBoard(
        @Args('boardId') boardId: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    ): Promise<Board> {
        return this.boardsService.update({ boardId, updateBoardInput });
    }

    @Mutation(() => Boolean)
    deleteBoard(
        @Args('boardId') boardId: string, //
    ): Promise<boolean> {
        return this.boardsService.delete({ boardId });
    }

    // fetchBoardsWithDeleted restoreBoard
}

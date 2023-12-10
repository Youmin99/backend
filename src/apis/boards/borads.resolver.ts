// boards.resolver.ts
import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { UpdateBoardInput } from './dto/update-board.input';
import { type } from 'os';

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => [Board])
    fetchBoards(
        @Args('search', { nullable: true }) search: string,
        @Args({ name: 'page', type: () => Int, nullable: true }) page: number,
    ): Promise<Board[]> {
        return this.boardsService.findAll({ search, page });
    }

    @Query(() => [Board])
    fetchBestBoards(): Promise<Board[]> {
        return this.boardsService.findBest();
    }

    @Query(() => Board)
    fetchBoard(@Args('boardId') boardId: string): Promise<Board> {
        return this.boardsService.findOne({ boardId });
    }

    @Query(() => Int)
    fetchBoardsCount(
        @Args('search', { nullable: true }) search: string,
    ): Promise<number> {
        return this.boardsService.boardsCount({ search });
    }

    @Mutation(() => Number)
    likeBoard(@Args('boardId') boardId: string): Promise<Number> {
        return this.boardsService.likeCount({ boardId });
    }

    @Mutation(() => Number)
    dislikeBoard(@Args('boardId') boardId: string): Promise<Number> {
        return this.boardsService.dislikeCount({ boardId });
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
        @Args('password') password: string,
        @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    ): Promise<Board> {
        return this.boardsService.update({
            boardId,
            password,
            updateBoardInput,
        });
    }

    @Mutation(() => Boolean)
    deleteBoard(
        @Args('boardId') boardId: string, //
    ): Promise<boolean> {
        return this.boardsService.delete({ boardId });
    }

    // fetchBoardsWithDeleted restoreBoard
}

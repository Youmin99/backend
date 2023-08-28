// boards.resolver.ts
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => [Board], { nullable: true })
    fetchBoards():  Promise<Board[]> {
        return this.boardsService.findAll();
    }

    @Query(() => Board, { nullable: true })
    fetchBoard( @Args('boardId') boardId: string):  Promise<Board> {
        return this.boardsService.findOne({boardId});
    }

    @Mutation(() => String)
    createBoard(
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ): string {
        return this.boardsService.create({ createBoardInput });
    }
    
}

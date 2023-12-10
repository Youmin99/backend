// boards.resolver.ts
import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UpdateBoardCommentInput } from './dto/update-boardComment.input';
import { BoardComment } from './entities/boardComment.entity';
import { BoardsCommentService } from './boardsComment.service';
import { CreateBoardCommentInput } from './dto/create-boardComment.input';

@Resolver()
export class BoardsCommentResolver {
    constructor(private readonly boardCommentsService: BoardsCommentService) {}

    @Mutation(() => BoardComment)
    createBoardComment(
        @Args('boardId') boardId: string,
        @Args('createBoardCommentInput')
        createBoardCommentInput: CreateBoardCommentInput,
    ): Promise<BoardComment> {
        return this.boardCommentsService.create({
            boardId,
            createBoardCommentInput,
        });
    }

    @Mutation(() => BoardComment)
    async updateBoardComment(
        @Args('boardCommentId') boardCommentId: string,
        @Args('password') password: string,
        @Args('updateBoardCommentInput')
        updateBoardCommentInput: UpdateBoardCommentInput,
    ): Promise<BoardComment> {
        return this.boardCommentsService.update({
            boardCommentId,
            password,
            updateBoardCommentInput,
        });
    }

    @Mutation(() => Boolean)
    deleteBoardComment(
        @Args('password') password: string,
        @Args('boardCommentId') boardCommentId: string,
    ): Promise<boolean> {
        return this.boardCommentsService.delete({ password, boardCommentId });
    }

    @Query(() => [BoardComment])
    fetchBoardComments(
        @Args('boardId') boardId: string,
        @Args({ name: 'page', type: () => Int, nullable: true }) page: number,
    ): Promise<BoardComment[]> {
        return this.boardCommentsService.findAll({ boardId, page });
    }
}

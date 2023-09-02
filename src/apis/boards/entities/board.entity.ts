// board.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { BoardComment } from 'src/apis/boardsComment/entities/boardComment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    contents: string;

    @Column()
    @Field(() => String)
    youtubeUrl: string;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @OneToMany(() => BoardComment, (boardComments) => boardComments.board)
    @Field(() => [BoardComment])
    boardComments: BoardComment[];
}

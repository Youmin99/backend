// board.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { BoardAddress } from 'src/apis/boardsAddress/entities/boardAddress.entity';
import { BoardComment } from 'src/apis/boardsComment/entities/boardComment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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
    password: string;

    @Column()
    @Field(() => String)
    contents: string;

    @Column()
    @Field(() => String, { nullable: true })
    youtubeUrl: string;

    @ManyToOne(() => User)
    @Field(() => User, { nullable: true })
    user: User;

    @JoinColumn()
    @OneToOne(() => BoardAddress)
    @Field(() => BoardAddress, { nullable: true })
    boardAddress: BoardAddress;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => BoardComment, (boardComments) => boardComments.board)
    boardComments: BoardComment[];
}

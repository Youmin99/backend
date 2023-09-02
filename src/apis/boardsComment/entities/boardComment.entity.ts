// board.entity.ts

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoardComment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    contents: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => Float)
    rating: number;

    @ManyToOne(() => Board)
    @Field(() => Board)
    board: Board;
}

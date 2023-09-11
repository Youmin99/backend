// board.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
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
export class Token {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    @Field(() => String)
    accessToken: string;
}

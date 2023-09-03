// user.entity.ts

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    password: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    phone: number;

    @Column({ default: false })
    @Field(() => Boolean)
    isDeleted: boolean;
}

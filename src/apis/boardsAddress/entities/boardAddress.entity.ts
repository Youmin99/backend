import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoardAddress {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    addressDetail: string;

    @Column()
    @Field(() => Date)
    meetingTime: Date;
}

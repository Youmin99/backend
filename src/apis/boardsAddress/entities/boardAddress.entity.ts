import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoardAddress {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    @Field(() => String, { nullable: true })
    zipcode: string;

    @Column()
    @Field(() => String, { nullable: true })
    address: string;

    @Column()
    @Field(() => String, { nullable: true })
    addressDetail: string;
}

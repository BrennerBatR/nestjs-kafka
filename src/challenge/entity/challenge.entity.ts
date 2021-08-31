import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Submission } from '../../submission/entity/submission.entity';

@ObjectType()
@Entity()
export class Challenge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createDate: string;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateDate: string;

  @IsString()
  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field((type) => [Submission], { nullable: true })
  @OneToMany((type) => Submission, (submission) => submission.challenge)
  submissions: Submission[];
}

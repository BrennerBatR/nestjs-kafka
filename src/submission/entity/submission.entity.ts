import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Challenge } from '../../challenge/entity/challenge.entity';

export enum SubmissionStatus {
  Pending = 'Pending',
  Error = 'Error',
  Done = 'Done',
}

@ObjectType()
@Entity()
export class Submission extends BaseEntity {
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
  repositoryUrl: string;

  @Field()
  @Column({ length: 10, default: SubmissionStatus.Pending })
  status: string;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  grade: number;

  @Field((type) => Challenge)
  @ManyToOne((type) => Challenge, (challenge) => challenge.submissions)
  challenge: Challenge;
}

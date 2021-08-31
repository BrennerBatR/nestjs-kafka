import { InputType, Field, OmitType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Submission } from './entity/submission.entity';

@InputType()
export class CreateSubmissionDTO extends OmitType(Submission, [
  'id',
  'createDate',
  'updateDate',
  'grade',
  'status',
  'challenge'
]) {
  @ApiProperty()
  @Field()
  repositoryUrl: string;

  @ApiProperty()
  @IsUUID()
  @Field()
  challengeId: string;
}

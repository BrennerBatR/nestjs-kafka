import { InputType, Field, OmitType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Challenge } from './entity/challenge.entity';

@InputType()
export class CreateChallengeDTO extends OmitType(Challenge, [
  'id',
  'createDate',
  'updateDate',
]) {
  @ApiProperty()
  @IsString()
  @Field()
  title: string;

  @ApiProperty()
  @Field()
  description: string;
}

@InputType()
export class UpdateChallengeDTO extends OmitType(Challenge, [
  'createDate',
  'updateDate',
]) {
  @ApiProperty()
  @IsUUID()
  @Field()
  id: string;

  @ApiProperty()
  @IsString()
  @Field()
  title: string;

  @ApiProperty()
  @Field()
  description: string;
}

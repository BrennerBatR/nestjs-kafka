import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { Submission, SubmissionStatus } from './entity/submission.entity';
import { CreateSubmissionDTO } from './submission.dto';
import { SubmissionService } from './submission.service';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Resolver()
@ApiTags('Submission')
export class SubmissionResolver implements OnModuleInit {
  pattern: string;
  constructor(
    private readonly submissionService: SubmissionService,

    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka,
  ) {
    this.pattern = 'challenge.correction';
  }

  @Mutation((returns) => Submission)
  async answerChallenge(
    @Args('submission') submissionDto: CreateSubmissionDTO,
  ): Promise<Submission> {
    const submission = await this.submissionService.create(submissionDto);
    if (submission.status !== SubmissionStatus.Error)
      this.getCorrection(submission);
    return submission;
  }

  @Query(() => [Submission])
  public async getAllSubmissions(
    @Args('status') status?: SubmissionStatus,
    @Args('dateStart') dateStart?: string,
    @Args('dateEnd') dateEnd?: string,
    @Args('take') take: number = 10,
    @Args('skip') skip: number = 0,
  ): Promise<Submission[]> {
    return this.submissionService.find(take, skip, status, dateStart, dateEnd);
  }

  @Query((returns) => Submission)
  async getSubmissionById(@Args('id') id: string): Promise<Submission> {
    return await this.submissionService.findOne(id);
  }

  async getCorrection(submission: Submission) {
    const correctLessonMessage: CorrectLessonMessage = {
      value: {
        submissionId: submission.id,
        repositoryUrl: submission.repositoryUrl,
      },
    };

    const result: CorrectLessonResponse = await lastValueFrom(
      this.clientKafka.send(
        this.pattern,
        JSON.stringify({
          key: correctLessonMessage.value.submissionId,
          value: JSON.stringify(correctLessonMessage.value),
        }),
      ),
    );

    submission.grade = result.grade;
    submission.status = result.status;
    await this.submissionService.update(submission);
  }

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf(this.pattern);
  }
}

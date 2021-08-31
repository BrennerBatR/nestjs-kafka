import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeService } from '../challenge/challenge.service';
import { Between, FindConditions, Repository } from 'typeorm';
import { Submission, SubmissionStatus } from './entity/submission.entity';
import { CreateSubmissionDTO } from './submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly challengeService: ChallengeService,

    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async find(
    take: number,
    skip: number,
    status?: SubmissionStatus,
    dateStart?: string,
    dateEnd?: string,
  ): Promise<Submission[]> {
    const findConditions: FindConditions<Submission> = {};
    if (status) findConditions.status = status;
    if (dateStart) findConditions.createDate = Between(dateStart, dateEnd);

    return await this.submissionRepository.find({
      where: findConditions,
      take,
      skip,
      order: { createDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Submission> {
    return await this.submissionRepository.findOne(id);
  }

  async create(submission: CreateSubmissionDTO): Promise<Submission> {
    let status = SubmissionStatus.Pending;

    if (!submission.repositoryUrl.match(/github.com/))
      status = SubmissionStatus.Error;
    else if (
      submission.repositoryUrl.split('github.com/')[1].split('/').length !== 2
    )
      status = SubmissionStatus.Error;

    const challenge = await this.challengeService.findOne(
      submission.challengeId,
    );

    if (!challenge) status = SubmissionStatus.Error;

    return await this.submissionRepository
      .create({ ...submission, status, challenge })
      .save();
  }

  async update(submission: Submission): Promise<Submission> {
    return await (await this.submissionRepository.preload(submission)).save();
  }
}

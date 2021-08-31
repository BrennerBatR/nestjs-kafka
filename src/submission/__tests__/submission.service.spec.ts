import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  mockedChallenge,
  mockedCreateSubmissionDTO,
  mockedSubmission,
  MockType,
  repositoryMockFactory,
} from '../../../test/mock';
import { SubmissionService } from '../submission.service';
import { Submission, SubmissionStatus } from '../entity/submission.entity';
import { CreateSubmissionDTO } from '../submission.dto';
import { ChallengeService } from '../../challenge/challenge.service';
import { Challenge } from '../../challenge/entity/challenge.entity';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let challengeService: ChallengeService;
  let repositoryMock: MockType<Repository<Submission>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: getRepositoryToken(Submission),
          useFactory: repositoryMockFactory,
        },
        ChallengeService,
        {
          provide: getRepositoryToken(Challenge),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
    challengeService = module.get<ChallengeService>(ChallengeService);
    repositoryMock = module.get(getRepositoryToken(Submission));

    jest.spyOn(challengeService, 'findOne').mockResolvedValue(mockedChallenge);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a answer', () => {
    it('should create a submission', async () => {
      repositoryMock.create.mockReturnValue({ save: () => mockedSubmission });
      expect(
        await service.create(mockedCreateSubmissionDTO as CreateSubmissionDTO),
      ).toEqual(mockedSubmission);
    });
  });

  describe('Get submission', () => {
    it('should return submission', async () => {
      repositoryMock.findOne.mockReturnValue(mockedSubmission);
      expect(await service.findOne(mockedSubmission.id)).toBe(mockedSubmission);
    });
  });

  describe('Get list of submissions', () => {
    it('should return submissions', async () => {
      repositoryMock.find.mockImplementation(() =>
        Promise.resolve([mockedSubmission]),
      );
      expect(await service.find(10, 0)).toStrictEqual([mockedSubmission]);
    });
  });

  describe('Update submission', () => {
    it('should return submission ', async () => {
      repositoryMock.preload.mockReturnValue({
        preload: () => mockedSubmission,
      });
      repositoryMock.preload.mockReturnValue({ save: () => mockedSubmission });
      expect(await service.update(mockedSubmission)).toBe(mockedSubmission);
    });
  });
});

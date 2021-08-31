import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockedChallenge, MockType, repositoryMockFactory } from '../../../test/mock';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../entity/challenge.entity';

describe('ChallengeService', () => {
  let service: ChallengeService;
  let repositoryMock: MockType<Repository<Challenge>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: getRepositoryToken(Challenge),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
    repositoryMock = module.get(getRepositoryToken(Challenge));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a challenge', () => {
    it('should create a challenge', async () => {
      repositoryMock.create.mockReturnValue({ save: () => mockedChallenge });
      expect(await service.create(mockedChallenge as Challenge)).toEqual(
        mockedChallenge,
      );
      expect(repositoryMock.create).toHaveBeenCalledWith(mockedChallenge);
    });
  });

  describe('Get challenge', () => {
    it('should return challenge', async () => {
      repositoryMock.findOne.mockReturnValue(mockedChallenge);
      expect(await service.findOne(mockedChallenge.id)).toBe(mockedChallenge);
    });
  });

  describe('Get list of challenges', () => {
    it('should return challenges', async () => {
      repositoryMock.find.mockImplementation(() =>
        Promise.resolve([mockedChallenge]),
      );
      expect(await service.find(10, 0)).toStrictEqual([mockedChallenge]);
    });
  });

  describe('Update challenge', () => {
    it('should return challenge ', async () => {
      repositoryMock.preload.mockReturnValue({
        preload: () => mockedChallenge,
      });
      repositoryMock.preload.mockReturnValue({ save: () => mockedChallenge });
      expect(await service.update(mockedChallenge)).toBe(mockedChallenge);
    });
  });

  describe('Delete challenge', () => {
    it('should return a string ', async () => {
      repositoryMock.delete.mockReturnValue({
        delete: () => mockedChallenge,
      });
      repositoryMock.delete.mockReturnValue({ save: () => mockedChallenge });
      expect(await service.delete(mockedChallenge.id)).toBe('removed');
    });
  });
});

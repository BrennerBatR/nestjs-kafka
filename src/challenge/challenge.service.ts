import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateChallengeDTO, UpdateChallengeDTO } from './challenge.dto';
import { Challenge } from './entity/challenge.entity';
@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  async find(
    take: number,
    skip: number,
    search?: string,
  ): Promise<Challenge[]> {
    return await this.challengeRepository.find({
      where: [
        { title: ILike(`%${search}%`) },
        { description: ILike(`%${search}%`) },
      ],
      take,
      skip,
      order: { createDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Challenge> {
    return await this.challengeRepository.findOne(id);
  }

  async create(challenge: CreateChallengeDTO): Promise<Challenge> {
    return await this.challengeRepository.create({ ...challenge }).save();
  }

  async update(challenge: UpdateChallengeDTO): Promise<Challenge> {
    return await (
      await this.challengeRepository.preload({ ...challenge })
    ).save();
  }

  async delete(id: string): Promise<string> {
    const deleted = await this.challengeRepository.delete(id);

    if (deleted.affected === 0) return 'no removed';
    return 'removed';
  }
}

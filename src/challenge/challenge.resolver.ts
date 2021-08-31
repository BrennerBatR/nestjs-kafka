import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateChallengeDTO, UpdateChallengeDTO } from './challenge.dto';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entity/challenge.entity';

@Resolver()
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Mutation((returns) => Challenge)
  async createChallenge(
    @Args('challenge') challengeDto: CreateChallengeDTO,
  ): Promise<Challenge> {
    return await this.challengeService.create(challengeDto);
  }

  @Mutation((returns) => Challenge)
  async updateChallenge(
    @Args('challenge') updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<Challenge> {
    return await this.challengeService.update(updateChallengeDTO);
  }

  @Mutation((returns) => String)
  async deleteChallenge(@Args('id') id: string): Promise<string> {
    return await this.challengeService.delete(id);
  }

  @Query(() => [Challenge])
  public async getAllChallenges(
    @Args('search') search?: string,
    @Args('take') take: number = 10,
    @Args('skip') skip: number = 0,
  ): Promise<Challenge[]> {
    return this.challengeService.find(take, skip, search);
  }
}

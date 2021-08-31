import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entity/challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeResolver, ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeModule } from '../challenge/challenge.module';
import { Submission } from './entity/submission.entity';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer ' + Math.random(),
          },
        },
      },
    ]),
    ChallengeModule,
  ],
  controllers: [],
  providers: [SubmissionService, SubmissionResolver],
})
export class SubmissionModule {}

import { Injectable, Inject } from '@nestjs/common';
import { GoalDto } from '../../dto/goal.dto';
import { GoalRepositoryPort } from '../../ports/repositories/goal.repository.port';

@Injectable()
export class GetGoalsUseCase {
  constructor(
    @Inject('GoalRepositoryPort')
    private readonly goalRepository: GoalRepositoryPort,
  ) {}

  async execute(): Promise<GoalDto[]> {
    return this.goalRepository.findAll();
  }
}

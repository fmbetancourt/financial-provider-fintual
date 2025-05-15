import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { GoalDto } from '../../dto/goal.dto';
import { GoalRepositoryPort } from '../../ports/repositories/goal.repository.port';

@Injectable()
export class GetGoalByIdUseCase {
  constructor(
    @Inject('GoalRepositoryPort')
    private readonly goalRepository: GoalRepositoryPort,
  ) {}

  async execute(id: string): Promise<GoalDto> {
    const goal = await this.goalRepository.findById(id);
    
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    
    return goal;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { GoalDto, UpdateGoalDto } from '../../dto/goal.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class UpdateGoalUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(goalId: string, goalData: UpdateGoalDto): Promise<GoalDto> {
    return this.fintualApiPort.updateGoal(goalId, goalData);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { GoalDto, CreateGoalDto } from '../../dto/goal.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class CreateGoalUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(goalData: CreateGoalDto): Promise<GoalDto> {
    return this.fintualApiPort.createGoal(goalData);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class DeleteGoalUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(goalId: string): Promise<void> {
    await this.fintualApiPort.deleteGoal(goalId);
  }
}

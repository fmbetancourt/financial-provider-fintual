import { Injectable } from '@nestjs/common';
import { GoalRepositoryPort } from '../../application/ports/repositories/goal.repository.port';
import { FintualApiAdapter } from '../adapters/fintual-api.adapter';
import { GoalDto } from '../../application/dto/goal.dto';

@Injectable()
export class GoalRepository implements GoalRepositoryPort {
  constructor(private readonly fintualApiAdapter: FintualApiAdapter) {}

  async findAll(): Promise<GoalDto[]> {
    return this.fintualApiAdapter.getGoals();
  }

  async findById(id: string): Promise<GoalDto> {
    return this.fintualApiAdapter.getGoalById(id);
  }
}

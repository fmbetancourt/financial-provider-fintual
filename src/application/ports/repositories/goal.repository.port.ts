import { GoalDto } from '../../dto/goal.dto';

export interface GoalRepositoryPort {
  findAll(): Promise<GoalDto[]>;
  findById(id: string): Promise<GoalDto>;
}

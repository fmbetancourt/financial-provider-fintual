import { InvestmentDto } from '../../dto/investment.dto';

export interface InvestmentRepositoryPort {
  findAll(goalId: string): Promise<InvestmentDto[]>;
  findById(id: string): Promise<InvestmentDto>;
}

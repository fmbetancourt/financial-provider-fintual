import { Injectable, Inject } from '@nestjs/common';
import { InvestmentDto } from '../../dto/investment.dto';
import { InvestmentRepositoryPort } from '../../ports/repositories/investment.repository.port';

@Injectable()
export class GetInvestmentsUseCase {
  constructor(
    @Inject('InvestmentRepositoryPort')
    private readonly investmentRepository: InvestmentRepositoryPort,
  ) {}

  async execute(goalId: string): Promise<InvestmentDto[]> {
    return this.investmentRepository.findAll(goalId);
  }
}

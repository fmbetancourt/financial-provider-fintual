import { Injectable } from '@nestjs/common';
import { InvestmentRepositoryPort } from '../../application/ports/repositories/investment.repository.port';
import { FintualApiAdapter } from '../adapters/fintual-api.adapter';
import { InvestmentDto } from '../../application/dto/investment.dto';

@Injectable()
export class InvestmentRepository implements InvestmentRepositoryPort {
  constructor(private readonly fintualApiAdapter: FintualApiAdapter) {}

  async findAll(goalId: string): Promise<InvestmentDto[]> {
    return this.fintualApiAdapter.getInvestments(goalId);
  }

  async findById(id: string): Promise<InvestmentDto> {
    throw new Error('Method not implemented - requires specific API endpoint');
  }
}

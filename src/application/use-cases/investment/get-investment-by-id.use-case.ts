import { Injectable, Inject } from '@nestjs/common';
import { InvestmentDto } from '../../dto/investment.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetInvestmentByIdUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(investmentId: string): Promise<InvestmentDto> {
    return this.fintualApiPort.getInvestmentById(investmentId);
  }
}

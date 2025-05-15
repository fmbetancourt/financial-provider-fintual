import { Injectable, Inject } from '@nestjs/common';
import { InvestmentDto } from '../../dto/investment.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class UpdateInvestmentUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(investmentId: string, investmentData: Partial<InvestmentDto>): Promise<InvestmentDto> {
    return this.fintualApiPort.updateInvestment(investmentId, investmentData);
  }
}

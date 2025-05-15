import { Injectable, Inject } from '@nestjs/common';
import { InvestmentDto } from '../../dto/investment.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class CreateInvestmentUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(investmentData: Partial<InvestmentDto>): Promise<InvestmentDto> {
    return this.fintualApiPort.createInvestment(investmentData);
  }
}

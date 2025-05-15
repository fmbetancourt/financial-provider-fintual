import { Injectable, Inject } from '@nestjs/common';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class DeleteInvestmentUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(investmentId: string): Promise<void> {
    await this.fintualApiPort.deleteInvestment(investmentId);
  }
}

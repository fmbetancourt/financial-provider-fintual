import { Injectable, Inject } from '@nestjs/common';
import { PortfolioDto } from '../../dto/portfolio.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetPortfolioByIdUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(portfolioId: string): Promise<PortfolioDto> {
    return this.fintualApiPort.getPortfolioById(portfolioId);
  }
}

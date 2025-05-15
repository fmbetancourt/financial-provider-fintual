import { Injectable, Inject } from '@nestjs/common';
import { PortfolioDto } from '../../dto/portfolio.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetPortfoliosUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(): Promise<PortfolioDto[]> {
    return this.fintualApiPort.getPortfolios();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { MarketDataDto } from '../../dto/market-data.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';
import { FintualApiAdapter } from '../../../infrastructure/adapters/fintual-api.adapter';

@Injectable()
export class GetMarketDataUseCase {
  constructor(
    @Inject(FintualApiAdapter)
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(portfolioId: string): Promise<MarketDataDto> {
    return await this.fintualApiPort.getMarketData(portfolioId);
  }
}

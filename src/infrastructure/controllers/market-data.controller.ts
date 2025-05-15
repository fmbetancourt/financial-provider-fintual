import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { GetMarketDataUseCase } from '../../application/use-cases/market-data/get-market-data.use-case';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { MarketDataDto } from '../../application/dto/market-data.dto';

@Controller('market-data')
@UseInterceptors(ResponseTransformInterceptor)
export class MarketDataController {
  constructor(
    private readonly getMarketDataUseCase: GetMarketDataUseCase,
  ) {}

  @Get('portfolios/:portfolioId')
  async getMarketData(@Param('portfolioId') portfolioId: string): Promise<MarketDataDto> {
    return await this.getMarketDataUseCase.execute(portfolioId);
  }
}

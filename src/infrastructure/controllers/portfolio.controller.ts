import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { PortfolioDto } from '../../application/dto/portfolio.dto';
import { SeriesDto } from '../../application/dto/series.dto';
import { GetPortfoliosUseCase } from '../../application/use-cases/portfolio/get-portfolios.use-case';
import { GetPortfolioByIdUseCase } from '../../application/use-cases/portfolio/get-portfolio-by-id.use-case';
import { GetPortfolioSeriesUseCase } from '../../application/use-cases/portfolio/get-portfolio-series.use-case';

@Controller('portfolios')
@UseInterceptors(ResponseTransformInterceptor)
export class PortfolioController {
  constructor(
    private readonly getPortfoliosUseCase: GetPortfoliosUseCase,
    private readonly getPortfolioByIdUseCase: GetPortfolioByIdUseCase,
    private readonly getPortfolioSeriesUseCase: GetPortfolioSeriesUseCase,
  ) {}

  @Get()
  async getPortfolios(): Promise<PortfolioDto[]> {
    return await this.getPortfoliosUseCase.execute();
  }

  @Get(':id')
  async getPortfolioById(@Param('id') id: string): Promise<PortfolioDto> {
    return await this.getPortfolioByIdUseCase.execute(id);
  }

  @Get(':id/series')
  async getPortfolioSeries(@Param('id') id: string): Promise<SeriesDto[]> {
    return await this.getPortfolioSeriesUseCase.execute(id);
  }
}

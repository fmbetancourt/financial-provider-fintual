import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { SeriesDto } from '../../application/dto/series.dto';
import { GetSeriesUseCase } from '../../application/use-cases/series/get-series.use-case';
import { GetSeriesByIdUseCase } from '../../application/use-cases/series/get-series-by-id.use-case';
import { GetSeriesHistoricalDataUseCase } from '../../application/use-cases/series/get-series-historical-data.use-case';

@Controller('series')
@UseInterceptors(ResponseTransformInterceptor)
export class SeriesController {
  constructor(
    private readonly getSeriesUseCase: GetSeriesUseCase,
    private readonly getSeriesByIdUseCase: GetSeriesByIdUseCase,
    private readonly getSeriesHistoricalDataUseCase: GetSeriesHistoricalDataUseCase,
  ) {}

  @Get()
  async getSeries(): Promise<SeriesDto[]> {
    return await this.getSeriesUseCase.execute();
  }

  @Get(':id')
  async getSeriesById(@Param('id') id: string): Promise<SeriesDto> {
    return await this.getSeriesByIdUseCase.execute(id);
  }

  @Get(':id/historical-data')
  async getSeriesHistoricalData(
    @Param('id') id: string,
    @Query('start_date') startDate: string,
    @Query('end_date') endDate: string,
  ): Promise<any[]> {
    return await this.getSeriesHistoricalDataUseCase.execute(id, startDate, endDate);
  }
}

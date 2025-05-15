import { Injectable, Inject } from '@nestjs/common';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetSeriesHistoricalDataUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(seriesId: string, startDate: string, endDate: string): Promise<any[]> {
    return this.fintualApiPort.getSeriesHistoricalData(seriesId, startDate, endDate);
  }
}

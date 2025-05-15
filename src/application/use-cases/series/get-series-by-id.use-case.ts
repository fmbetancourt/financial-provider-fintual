import { Injectable, Inject } from '@nestjs/common';
import { SeriesDto } from '../../dto/series.dto';
import { FintualApiPort } from '../../ports/fintual-api.port';

@Injectable()
export class GetSeriesByIdUseCase {
  constructor(
    @Inject('FintualApiPort')
    private readonly fintualApiPort: FintualApiPort,
  ) {}

  async execute(seriesId: string): Promise<SeriesDto> {
    return this.fintualApiPort.getSeriesById(seriesId);
  }
}

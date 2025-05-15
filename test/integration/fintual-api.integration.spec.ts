import { Test } from '@nestjs/testing';
import { FintualApiAdapter } from '../../src/infrastructure/adapters/fintual-api.adapter';
import { HttpService } from '../../src/infrastructure/services/http.service';
import { ConfigService } from '@nestjs/config';
import { GoalDto } from '../../src/application/dto/goal.dto';
import { InvestmentDto } from '../../src/application/dto/investment.dto';
import { MarketDataDto } from '../../src/application/dto/market-data.dto';

describe('FintualApiAdapter Integration Tests', () => {
  let fintualApiAdapter: FintualApiAdapter;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FintualApiAdapter,
        HttpService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'FINTUAL_API_URL':
                  return 'https://api.fintual.com/api/v1';
                case 'FINTUAL_API_TOKEN':
                  return 'test-token';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    fintualApiAdapter = moduleRef.get<FintualApiAdapter>(FintualApiAdapter);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  describe('getGoals', () => {
    it('should return array of goals', async () => {
      // Mock the HTTP service
      jest.spyOn(httpService, 'get').mockResolvedValue({
        data: [
          {
            id: '1',
            name: 'Test Goal',
            created_at: '2025-05-14T12:00:00Z',
            updated_at: '2025-05-14T12:00:00Z',
            target_amount: 10000,
            current_amount: 5000,
            target_date: '2026-05-14T12:00:00Z',
            investments: ['1', '2'],
          },
        ],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });

      const goals: GoalDto[] = await fintualApiAdapter.getGoals();
      
      expect(goals).toHaveLength(1);
      expect(goals[0].id).toBe('1');
      expect(goals[0].name).toBe('Test Goal');
      expect(goals[0].targetAmount).toBe(10000);
    });
  });

  // Add more tests as needed for other methods
});

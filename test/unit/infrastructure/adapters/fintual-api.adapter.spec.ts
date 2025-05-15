import { Test, TestingModule } from '@nestjs/testing';
import { FintualApiAdapter } from '../../../../src/infrastructure/adapters/fintual-api.adapter';
import { HttpService } from '../../../../src/infrastructure/services/http.service';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';

describe('FintualApiAdapter', () => {
  let adapter: FintualApiAdapter;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FintualApiAdapter,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'FINTUAL_API_URL') return 'https://api.fintual.com/api/v1';
              if (key === 'FINTUAL_API_TOKEN') return 'test-token';
              return null;
            }),
          },
        },
      ],
    }).compile();

    adapter = module.get<FintualApiAdapter>(FintualApiAdapter);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('getGoals', () => {
    it('should return an array of goals', async () => {
      const mockResponse = {
        data: [
          {
            id: '1',
            name: 'Test Goal',
            created_at: '2025-05-14T12:00:00Z',
            updated_at: '2025-05-14T12:00:00Z',
            target_amount: 10000,
            current_amount: 5000,
            target_date: '2026-05-14T12:00:00Z',
          },
        ],
      };

      (httpService.get as jest.Mock).mockResolvedValue(mockResponse);

      const goals = await adapter.getGoals();

      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.fintual.com/api/v1/goals',
        {
          Authorization: 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      );

      expect(goals).toHaveLength(1);
      expect(goals[0].id).toBe('1');
      expect(goals[0].name).toBe('Test Goal');
      expect(goals[0].targetAmount).toBe(10000);
    });

    it('should throw an exception if the API call fails', async () => {
      (httpService.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(adapter.getGoals()).rejects.toThrow(HttpException);
    });
  });

  // Add more tests for other methods
});

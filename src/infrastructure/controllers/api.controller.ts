import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get()
  getApiInfo() {
    return {
      name: 'Financial Provider Fintual API',
      version: '1.0.0',
      description: 'API for integrating with Fintual financial services',
      endpoints: {
        goals: {
          getAll: '/api/goals',
          getById: '/api/goals/:id',
        },
        investments: {
          getByGoalId: '/api/investments/goals/:goalId',
        },
        marketData: {
          getByPortfolioId: '/api/market-data/portfolios/:portfolioId',
        }
      }
    };
  }
}

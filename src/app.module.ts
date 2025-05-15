import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import appConfig from './infrastructure/config/app.config';
import environmentConfig from './infrastructure/config/environment.config';

// Controllers
import { ApiController } from './infrastructure/controllers/api.controller';
import { GoalController } from './infrastructure/controllers/goal.controller';
import { InvestmentController } from './infrastructure/controllers/investment.controller';
import { MarketDataController } from './infrastructure/controllers/market-data.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { PortfolioController } from './infrastructure/controllers/portfolio.controller';
import { SeriesController } from './infrastructure/controllers/series.controller';

// Use Cases - User
import { GetCurrentUserUseCase } from './application/use-cases/user/get-current-user.use-case';
import { GetUserByIdUseCase } from './application/use-cases/user/get-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.use-case';

// Use Cases - Goal
import { GetGoalsUseCase } from './application/use-cases/goal/get-goals.use-case';
import { GetGoalByIdUseCase } from './application/use-cases/goal/get-goal-by-id.use-case';
import { CreateGoalUseCase } from './application/use-cases/goal/create-goal.use-case';
import { UpdateGoalUseCase } from './application/use-cases/goal/update-goal.use-case';
import { DeleteGoalUseCase } from './application/use-cases/goal/delete-goal.use-case';

// Use Cases - Investment
import { GetInvestmentsUseCase } from './application/use-cases/investment/get-investments.use-case';
import { GetInvestmentByIdUseCase } from './application/use-cases/investment/get-investment-by-id.use-case';
import { CreateInvestmentUseCase } from './application/use-cases/investment/create-investment.use-case';
import { UpdateInvestmentUseCase } from './application/use-cases/investment/update-investment.use-case';
import { DeleteInvestmentUseCase } from './application/use-cases/investment/delete-investment.use-case';

// Use Cases - Portfolio
import { GetPortfoliosUseCase } from './application/use-cases/portfolio/get-portfolios.use-case';
import { GetPortfolioByIdUseCase } from './application/use-cases/portfolio/get-portfolio-by-id.use-case';
import { GetPortfolioSeriesUseCase } from './application/use-cases/portfolio/get-portfolio-series.use-case';

// Use Cases - Series
import { GetSeriesUseCase } from './application/use-cases/series/get-series.use-case';
import { GetSeriesByIdUseCase } from './application/use-cases/series/get-series-by-id.use-case';
import { GetSeriesHistoricalDataUseCase } from './application/use-cases/series/get-series-historical-data.use-case';

// Use Cases - Market Data
import { GetMarketDataUseCase } from './application/use-cases/market-data/get-market-data.use-case';

// Repositories
import { GoalRepository } from './infrastructure/repositories/goal.repository';
import { InvestmentRepository } from './infrastructure/repositories/investment.repository';

// Adapters
import { FintualApiAdapter } from './infrastructure/adapters/fintual-api.adapter';

// Services
import { HttpService } from './infrastructure/services/http.service';

// Exceptions & Interceptors
import { AllExceptionsFilter } from './infrastructure/exceptions/exception.filter';
import { ResponseTransformInterceptor } from './infrastructure/interceptors/response-transform.interceptor';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, environmentConfig],
      envFilePath: '.env',
    }),
  ],
  controllers: [
    ApiController,
    GoalController,
    InvestmentController,
    MarketDataController,
    UserController,
    PortfolioController,
    SeriesController,
  ],
  providers: [
    // Services
    HttpService,
    
    // Adapters
    {
      provide: 'FintualApiPort',
      useClass: FintualApiAdapter,
    },
    
    // Repositories
    {
      provide: 'GoalRepositoryPort',
      useClass: GoalRepository,
    },
    {
      provide: 'InvestmentRepositoryPort',
      useClass: InvestmentRepository,
    },
    
    // Use Cases - User
    GetCurrentUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    
    // Use Cases - Goal
    GetGoalsUseCase,
    GetGoalByIdUseCase,
    CreateGoalUseCase,
    UpdateGoalUseCase,
    DeleteGoalUseCase,
    
    // Use Cases - Investment
    GetInvestmentsUseCase,
    GetInvestmentByIdUseCase,
    CreateInvestmentUseCase,
    UpdateInvestmentUseCase,
    DeleteInvestmentUseCase,
    
    // Use Cases - Portfolio
    GetPortfoliosUseCase,
    GetPortfolioByIdUseCase,
    GetPortfolioSeriesUseCase,
    
    // Use Cases - Series
    GetSeriesUseCase,
    GetSeriesByIdUseCase,
    GetSeriesHistoricalDataUseCase,
    
    // Use Cases - Market Data
    GetMarketDataUseCase,
    
    // Global providers
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '../services/http.service';
import { FintualApiPort } from '../../application/ports/fintual-api.port';
import { GoalDto, CreateGoalDto, UpdateGoalDto } from '../../application/dto/goal.dto';
import { InvestmentDto } from '../../application/dto/investment.dto';
import { MarketDataDto } from '../../application/dto/market-data.dto';
import { ConfigService } from '@nestjs/config';
import { UserDto, UpdateUserDto } from '../../application/dto/user.dto';
import { PortfolioDto } from '../../application/dto/portfolio.dto';
import { SeriesDto } from '../../application/dto/series.dto';

@Injectable()
export class FintualApiAdapter implements FintualApiPort {
  private readonly baseUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('app.fintualApi.baseUrl') ?? 'https://fintual.cl/api/v1';
    this.apiToken = this.configService.get<string>('app.fintualApi.apiToken') ?? '';
    
    if (!this.apiToken) {
      console.warn('Fintual API token not provided. Some API calls may fail.');
    }
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  // Users
  async getCurrentUser(): Promise<UserDto> {
    try {
      const response = await this.httpService.get(`${this.baseUrl}/users/current`, this.getHeaders());
      return this.mapToUserDto(response.data);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch current user from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(userId: string): Promise<UserDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/users/${userId}`,
        this.getHeaders(),
      );
      return this.mapToUserDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch user from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<UserDto> {
    try {
      const response = await this.httpService.put(
        `${this.baseUrl}/users/${userId}`,
        userData,
        this.getHeaders(),
      );
      return this.mapToUserDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to update user in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Goals
  async getGoals(): Promise<GoalDto[]> {
    try {
      const response = await this.httpService.get(`${this.baseUrl}/goals`, this.getHeaders());
      return response.data.map(this.mapToGoalDto);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch goals from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getGoalById(goalId: string): Promise<GoalDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/goals/${goalId}`,
        this.getHeaders(),
      );
      return this.mapToGoalDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch goal from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createGoal(goalData: CreateGoalDto): Promise<GoalDto> {
    try {
      const response = await this.httpService.post(
        `${this.baseUrl}/goals`,
        goalData,
        this.getHeaders(),
      );
      return this.mapToGoalDto(response.data);
    } catch (error) {
      throw new HttpException(
        'Failed to create goal in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateGoal(goalId: string, goalData: UpdateGoalDto): Promise<GoalDto> {
    try {
      const response = await this.httpService.put(
        `${this.baseUrl}/goals/${goalId}`,
        goalData,
        this.getHeaders(),
      );
      return this.mapToGoalDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to update goal in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteGoal(goalId: string): Promise<void> {
    try {
      await this.httpService.delete(
        `${this.baseUrl}/goals/${goalId}`,
        this.getHeaders(),
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to delete goal in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Investments
  async getInvestments(goalId: string): Promise<InvestmentDto[]> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/goals/${goalId}/investments`,
        this.getHeaders(),
      );
      return response.data.map(this.mapToInvestmentDto);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch investments from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInvestmentById(investmentId: string): Promise<InvestmentDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/investments/${investmentId}`,
        this.getHeaders(),
      );
      return this.mapToInvestmentDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Investment not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch investment from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createInvestment(investmentData: Partial<InvestmentDto>): Promise<InvestmentDto> {
    try {
      const response = await this.httpService.post(
        `${this.baseUrl}/investments`,
        investmentData,
        this.getHeaders(),
      );
      return this.mapToInvestmentDto(response.data);
    } catch (error) {
      throw new HttpException(
        'Failed to create investment in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateInvestment(investmentId: string, investmentData: Partial<InvestmentDto>): Promise<InvestmentDto> {
    try {
      const response = await this.httpService.put(
        `${this.baseUrl}/investments/${investmentId}`,
        investmentData,
        this.getHeaders(),
      );
      return this.mapToInvestmentDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Investment not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to update investment in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteInvestment(investmentId: string): Promise<void> {
    try {
      await this.httpService.delete(
        `${this.baseUrl}/investments/${investmentId}`,
        this.getHeaders(),
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Investment not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to delete investment in Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Portfolios
  async getPortfolios(): Promise<PortfolioDto[]> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/portfolios`,
        this.getHeaders(),
      );
      return response.data.map(this.mapToPortfolioDto);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch portfolios from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPortfolioById(portfolioId: string): Promise<PortfolioDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/portfolios/${portfolioId}`,
        this.getHeaders(),
      );
      return this.mapToPortfolioDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch portfolio from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPortfolioSeries(portfolioId: string): Promise<SeriesDto[]> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/portfolios/${portfolioId}/series`,
        this.getHeaders(),
      );
      return response.data.map(this.mapToSeriesDto);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch portfolio series from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Series
  async getSeries(): Promise<SeriesDto[]> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/series`,
        this.getHeaders(),
      );
      return response.data.map(this.mapToSeriesDto);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch series from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeriesById(seriesId: string): Promise<SeriesDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/series/${seriesId}`,
        this.getHeaders(),
      );
      return this.mapToSeriesDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Series not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch series from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeriesHistoricalData(seriesId: string, startDate: string, endDate: string): Promise<any[]> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/series/${seriesId}/historical_data?start_date=${startDate}&end_date=${endDate}`,
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Series not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch series historical data from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Market data
  async getMarketData(portfolioId: string): Promise<MarketDataDto> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/portfolios/${portfolioId}/market-data`,
        this.getHeaders(),
      );
      return this.mapToMarketDataDto(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch market data from Fintual API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Mappers
  private mapToUserDto(data: any): UserDto {
    const user = new UserDto();
    user.id = data.id;
    user.email = data.email;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.createdAt = new Date(data.created_at);
    user.updatedAt = new Date(data.updated_at);
    return user;
  }

  private mapToGoalDto(data: any): GoalDto {
    const goal = new GoalDto();
    goal.id = data.id;
    goal.name = data.name;
    goal.createdAt = new Date(data.created_at);
    goal.updatedAt = new Date(data.updated_at);
    goal.targetAmount = data.target_amount;
    goal.currentAmount = data.current_amount;
    goal.targetDate = new Date(data.target_date);
    goal.investments = data.investments || [];
    goal.userId = data.user_id;
    goal.riskLevel = data.risk_level;
    goal.timeHorizon = data.time_horizon;
    goal.status = data.status;
    goal.portfolioId = data.portfolio_id;
    return goal;
  }

  private mapToInvestmentDto(data: any): InvestmentDto {
    const investment = new InvestmentDto();
    investment.id = data.id;
    investment.goalId = data.goal_id;
    investment.name = data.name;
    investment.portfolioId = data.portfolio_id;
    investment.amount = data.amount;
    investment.shares = data.shares;
    investment.createdAt = new Date(data.created_at);
    investment.updatedAt = new Date(data.updated_at);
    investment.profit = data.profit;
    investment.profitPercentage = data.profit_percentage;
    return investment;
  }

  private mapToPortfolioDto(data: any): PortfolioDto {
    const portfolio = new PortfolioDto();
    portfolio.id = data.id;
    portfolio.name = data.name;
    portfolio.description = data.description;
    portfolio.riskLevel = data.risk_level;
    portfolio.createdAt = new Date(data.created_at);
    portfolio.updatedAt = new Date(data.updated_at);
    portfolio.series = data.series || [];
    return portfolio;
  }

  private mapToSeriesDto(data: any): SeriesDto {
    const series = new SeriesDto();
    series.id = data.id;
    series.name = data.name;
    series.portfolioId = data.portfolio_id;
    series.nav = data.nav;
    series.createdAt = new Date(data.created_at);
    series.updatedAt = new Date(data.updated_at);
    return series;
  }

  private mapToMarketDataDto(data: any): MarketDataDto {
    const marketData = new MarketDataDto();
    marketData.date = new Date(data.date);
    marketData.portfolioId = data.portfolio_id;
    marketData.nav = data.nav;
    marketData.return1d = data.return_1d;
    marketData.return7d = data.return_7d;
    marketData.return30d = data.return_30d;
    marketData.return90d = data.return_90d;
    marketData.returnYTD = data.return_ytd;
    marketData.return1y = data.return_1y;
    return marketData;
  }
}

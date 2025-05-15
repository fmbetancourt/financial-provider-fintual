import { MarketDataDto } from '../dto/market-data.dto';
import { GoalDto, CreateGoalDto, UpdateGoalDto } from '../dto/goal.dto';
import { InvestmentDto } from '../dto/investment.dto';
import { UserDto, UpdateUserDto } from '../dto/user.dto';
import { PortfolioDto } from '../dto/portfolio.dto';
import { SeriesDto } from '../dto/series.dto';

export interface FintualApiPort {
  // Users
  getCurrentUser(): Promise<UserDto>;
  getUserById(userId: string): Promise<UserDto>;
  updateUser(userId: string, userData: UpdateUserDto): Promise<UserDto>;
  
  // Goals
  getGoals(): Promise<GoalDto[]>;
  getGoalById(goalId: string): Promise<GoalDto>;
  createGoal(goalData: CreateGoalDto): Promise<GoalDto>;
  updateGoal(goalId: string, goalData: UpdateGoalDto): Promise<GoalDto>;
  deleteGoal(goalId: string): Promise<void>;
  
  // Investments
  getInvestments(goalId: string): Promise<InvestmentDto[]>;
  getInvestmentById(investmentId: string): Promise<InvestmentDto>;
  createInvestment(investmentData: Partial<InvestmentDto>): Promise<InvestmentDto>;
  updateInvestment(investmentId: string, investmentData: Partial<InvestmentDto>): Promise<InvestmentDto>;
  deleteInvestment(investmentId: string): Promise<void>;
  
  // Portfolios
  getPortfolios(): Promise<PortfolioDto[]>;
  getPortfolioById(portfolioId: string): Promise<PortfolioDto>;
  getPortfolioSeries(portfolioId: string): Promise<SeriesDto[]>;
  
  // Series
  getSeries(): Promise<SeriesDto[]>;
  getSeriesById(seriesId: string): Promise<SeriesDto>;
  getSeriesHistoricalData(seriesId: string, startDate: string, endDate: string): Promise<any[]>;
  
  // Market data
  getMarketData(portfolioId: string): Promise<MarketDataDto>;
}

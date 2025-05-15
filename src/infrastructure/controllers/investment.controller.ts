import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { GetInvestmentsUseCase } from '../../application/use-cases/investment/get-investments.use-case';
import { GetInvestmentByIdUseCase } from '../../application/use-cases/investment/get-investment-by-id.use-case';
import { CreateInvestmentUseCase } from '../../application/use-cases/investment/create-investment.use-case';
import { UpdateInvestmentUseCase } from '../../application/use-cases/investment/update-investment.use-case';
import { DeleteInvestmentUseCase } from '../../application/use-cases/investment/delete-investment.use-case';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { InvestmentDto } from '../../application/dto/investment.dto';

@Controller('investments')
@UseInterceptors(ResponseTransformInterceptor)
export class InvestmentController {
  constructor(
    private readonly getInvestmentsUseCase: GetInvestmentsUseCase,
    private readonly getInvestmentByIdUseCase: GetInvestmentByIdUseCase, 
    private readonly createInvestmentUseCase: CreateInvestmentUseCase,
    private readonly updateInvestmentUseCase: UpdateInvestmentUseCase,
    private readonly deleteInvestmentUseCase: DeleteInvestmentUseCase,
  ) {}

  @Get('goals/:goalId')
  async getInvestments(@Param('goalId') goalId: string): Promise<InvestmentDto[]> {
    return await this.getInvestmentsUseCase.execute(goalId);
  }

  @Get(':id')
  async getInvestmentById(@Param('id') id: string): Promise<InvestmentDto> {
    return await this.getInvestmentByIdUseCase.execute(id);
  }

  @Post()
  async createInvestment(@Body() investmentData: Partial<InvestmentDto>): Promise<InvestmentDto> {
    return await this.createInvestmentUseCase.execute(investmentData);
  }

  @Put(':id')
  async updateInvestment(
    @Param('id') id: string,
    @Body() investmentData: Partial<InvestmentDto>,
  ): Promise<InvestmentDto> {
    return await this.updateInvestmentUseCase.execute(id, investmentData);
  }

  @Delete(':id')
  async deleteInvestment(@Param('id') id: string): Promise<void> {
    return await this.deleteInvestmentUseCase.execute(id);
  }
}

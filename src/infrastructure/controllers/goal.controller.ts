import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { GetGoalsUseCase } from '../../application/use-cases/goal/get-goals.use-case';
import { GetGoalByIdUseCase } from '../../application/use-cases/goal/get-goal-by-id.use-case';
import { CreateGoalUseCase } from '../../application/use-cases/goal/create-goal.use-case';
import { UpdateGoalUseCase } from '../../application/use-cases/goal/update-goal.use-case';
import { DeleteGoalUseCase } from '../../application/use-cases/goal/delete-goal.use-case';
import { ResponseTransformInterceptor } from '../interceptors/response-transform.interceptor';
import { GoalDto, CreateGoalDto, UpdateGoalDto } from '../../application/dto/goal.dto';

@Controller('goals')
@UseInterceptors(ResponseTransformInterceptor)
export class GoalController {
  constructor(
    private readonly getGoalsUseCase: GetGoalsUseCase,
    private readonly getGoalByIdUseCase: GetGoalByIdUseCase,
    private readonly createGoalUseCase: CreateGoalUseCase,
    private readonly updateGoalUseCase: UpdateGoalUseCase,
    private readonly deleteGoalUseCase: DeleteGoalUseCase,
  ) {}

  @Get()
  async getGoals(): Promise<GoalDto[]> {
    return await this.getGoalsUseCase.execute();
  }

  @Get(':id')
  async getGoalById(@Param('id') id: string): Promise<GoalDto> {
    return await this.getGoalByIdUseCase.execute(id);
  }

  @Post()
  async createGoal(@Body() goalData: CreateGoalDto): Promise<GoalDto> {
    return await this.createGoalUseCase.execute(goalData);
  }

  @Put(':id')
  async updateGoal(
    @Param('id') id: string,
    @Body() goalData: UpdateGoalDto,
  ): Promise<GoalDto> {
    return await this.updateGoalUseCase.execute(id, goalData);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string): Promise<void> {
    return await this.deleteGoalUseCase.execute(id);
  }
}

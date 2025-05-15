import { IsString, IsNumber, IsDate, IsUUID, IsArray, IsOptional, IsEnum, Min, Max } from 'class-validator';

enum GoalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class GoalDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  @Min(0)
  targetAmount: number;

  @IsNumber()
  @Min(0)
  currentAmount: number;

  @IsDate()
  targetDate: Date;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  riskLevel: number;

  @IsNumber()
  @Min(1)
  timeHorizon: number;

  @IsString()
  @IsEnum(GoalStatus)
  status: string;

  @IsUUID()
  portfolioId: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  investments: string[]; // Investment IDs
}

export class CreateGoalDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  targetAmount: number;

  @IsDate()
  targetDate: Date;

  @IsNumber()
  @Min(1)
  @Max(5)
  riskLevel: number;

  @IsNumber()
  @Min(1)
  timeHorizon: number;

  @IsOptional()
  @IsUUID()
  portfolioId?: string;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  targetAmount?: number;

  @IsOptional()
  @IsDate()
  targetDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  riskLevel?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  timeHorizon?: number;

  @IsOptional()
  @IsString()
  @IsEnum(GoalStatus)
  status?: string;

  @IsOptional()
  @IsUUID()
  portfolioId?: string;
}

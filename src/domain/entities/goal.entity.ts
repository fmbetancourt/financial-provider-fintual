export class Goal {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  userId: string;
  riskLevel: number;
  timeHorizon: number;
  status: string;
  portfolioId: string;
  investmentIds: string[];

  constructor(params: {
    id: string;
    name: string;
    targetAmount: number;
    targetDate: Date;
    userId: string;
    riskLevel?: number;
    timeHorizon?: number;
    status?: string;
    portfolioId?: string;
    currentAmount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    investmentIds?: string[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.targetAmount = params.targetAmount;
    this.targetDate = params.targetDate;
    this.userId = params.userId;
    this.riskLevel = params.riskLevel || 3; // Default risk level: Moderate
    this.timeHorizon = params.timeHorizon || 5; // Default 5 years
    this.status = params.status || 'active';
    this.portfolioId = params.portfolioId || '';
    this.currentAmount = params.currentAmount || 0;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
    this.investmentIds = params.investmentIds || [];
  }
}

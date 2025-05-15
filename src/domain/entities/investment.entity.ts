export class Investment {
  id: string;
  goalId: string;
  name: string;
  portfolioId: string;
  amount: number;
  shares: number;
  createdAt: Date;
  updatedAt: Date;
  profit: number;
  profitPercentage: number;
  transactionType: 'deposit' | 'withdrawal' | 'transfer';
  status: 'pending' | 'processed' | 'failed';
  transactionDate: Date;

  constructor(params: {
    id: string;
    goalId: string;
    name?: string;
    portfolioId: string;
    amount: number;
    shares?: number;
    profit?: number;
    profitPercentage?: number;
    transactionType?: 'deposit' | 'withdrawal' | 'transfer';
    status?: 'pending' | 'processed' | 'failed';
    transactionDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.goalId = params.goalId;
    this.name = params.name || '';
    this.portfolioId = params.portfolioId;
    this.amount = params.amount;
    this.shares = params.shares || 0;
    this.profit = params.profit || 0;
    this.profitPercentage = params.profitPercentage || 0;
    this.transactionType = params.transactionType || 'deposit';
    this.status = params.status || 'pending';
    this.transactionDate = params.transactionDate || new Date();
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }
}

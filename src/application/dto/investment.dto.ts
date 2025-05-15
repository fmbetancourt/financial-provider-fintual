export class InvestmentDto {
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
}

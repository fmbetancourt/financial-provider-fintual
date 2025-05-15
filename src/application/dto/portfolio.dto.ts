export class PortfolioDto {
  id: string;
  name: string;
  description: string;
  riskLevel: number;
  allocation: {
    equity: number;
    fixed_income: number;
    cash: number;
    alternatives: number;
  };
  nav: number;
  createdAt: Date;
  updatedAt: Date;
  series: string[];
}

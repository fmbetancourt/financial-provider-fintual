export class PortfolioEntity {
  id: string;
  name: string;
  description: string;
  riskLevel: number; // 1-5, where 5 is the highest risk
  allocation: {
    equity: number; // stocks percentage
    fixed_income: number; // bonds percentage
    cash: number; // cash percentage
    alternatives: number; // alternative investments percentage
  };
  nav: number; // Net Asset Value
  createdAt: Date;
  updatedAt: Date;
  seriesIds: string[]; // The series that compose this portfolio
}

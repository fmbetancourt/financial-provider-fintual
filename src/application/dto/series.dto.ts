export class SeriesDto {
  id: string;
  name: string;
  portfolioId: string;
  symbol: string;
  fundName: string;
  fundManager: string;
  type: 'equity' | 'fixed_income' | 'cash' | 'alternatives';
  nav: number;
  navDate: Date;
  performance: {
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
    ytd: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

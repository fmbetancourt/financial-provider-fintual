export class SeriesEntity {
  id: string;
  name: string;
  symbol: string;
  fundName: string;
  fundManager: string;
  type: 'equity' | 'fixed_income' | 'cash' | 'alternatives';
  nav: number; // Net Asset Value
  navDate: Date; // Date of the NAV valuation
  performance: {
    day: number; // 1-day return percentage
    week: number; // 1-week return percentage
    month: number; // 1-month return percentage
    quarter: number; // 3-month return percentage
    year: number; // 1-year return percentage
    ytd: number; // year-to-date return percentage
  };
  createdAt: Date;
  updatedAt: Date;
}

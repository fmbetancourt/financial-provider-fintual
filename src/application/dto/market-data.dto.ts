export class MarketDataDto {
  date: Date;
  portfolioId: string;
  nav: number;  // Net Asset Value
  return1d: number; // 1 day return percentage
  return7d: number; // 7 day return percentage
  return30d: number; // 30 day return percentage
  return90d: number; // 90 day return percentage
  returnYTD: number; // Year-to-date return percentage
  return1y: number; // 1 year return percentage
}

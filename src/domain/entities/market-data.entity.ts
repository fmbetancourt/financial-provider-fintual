export class MarketData {
  date: Date;
  portfolioId: string;
  nav: number;  // Net Asset Value
  return1d: number;
  return7d: number;
  return30d: number;
  return90d: number;
  returnYTD: number;
  return1y: number;

  constructor(params: {
    portfolioId: string;
    nav: number;
    date?: Date;
    return1d?: number;
    return7d?: number;
    return30d?: number;
    return90d?: number;
    returnYTD?: number;
    return1y?: number;
  }) {
    this.portfolioId = params.portfolioId;
    this.nav = params.nav;
    this.date = params.date || new Date();
    this.return1d = params.return1d || 0;
    this.return7d = params.return7d || 0;
    this.return30d = params.return30d || 0;
    this.return90d = params.return90d || 0;
    this.returnYTD = params.returnYTD || 0;
    this.return1y = params.return1y || 0;
  }
}

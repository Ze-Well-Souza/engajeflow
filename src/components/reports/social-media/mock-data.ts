
// Dados de engajamento
export interface EngagementDataPoint {
  name: string;
  engagementRate: number;
  comments: number;
  shares: number;
}

export const engagementData: EngagementDataPoint[] = [
  { name: 'Jan', engagementRate: 4.2, comments: 432, shares: 123 },
  { name: 'Fev', engagementRate: 3.8, comments: 321, shares: 98 },
  { name: 'Mar', engagementRate: 5.1, comments: 543, shares: 211 },
  { name: 'Abr', engagementRate: 4.8, comments: 459, shares: 187 },
  { name: 'Mai', engagementRate: 4.3, comments: 401, shares: 143 },
  { name: 'Jun', engagementRate: 5.2, comments: 587, shares: 231 }
];

// Dados de alcance
export interface ReachDataPoint {
  name: string;
  instagram: number;
  facebook: number;
  youtube: number;
}

export const reachData: ReachDataPoint[] = [
  { name: "Jan", instagram: 4000, facebook: 2400, youtube: 1200 },
  { name: "Fev", instagram: 3000, facebook: 1398, youtube: 2210 },
  { name: "Mar", instagram: 2000, facebook: 9800, youtube: 2290 },
  { name: "Abr", instagram: 2780, facebook: 3908, youtube: 2000 },
  { name: "Mai", instagram: 1890, facebook: 4800, youtube: 2181 },
  { name: "Jun", instagram: 2390, facebook: 3800, youtube: 2500 },
];

// Dados de conversão
export interface ConversionDataPoint {
  name: string;
  clicks: number;
  conversions: number;
  rate: number;
}

export const conversionData: ConversionDataPoint[] = [
  { name: "Jan", clicks: 1240, conversions: 124, rate: 10.0 },
  { name: "Fev", clicks: 1580, conversions: 173, rate: 10.9 },
  { name: "Mar", clicks: 2120, conversions: 265, rate: 12.5 },
  { name: "Abr", clicks: 1890, conversions: 204, rate: 10.8 },
  { name: "Mai", clicks: 2350, conversions: 329, rate: 14.0 },
  { name: "Jun", clicks: 2680, conversions: 390, rate: 14.5 },
];

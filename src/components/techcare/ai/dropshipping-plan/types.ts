
export interface NicheInfo {
  name: string;
  description: string;
  growthRate: number;
  competition: "baixa" | "média" | "alta";
  profit: "baixa" | "média" | "alta";
}

export interface SupplierInfo {
  name: string;
  platform: string;
  minOrderValue: string;
  shippingTime: string;
  rating: number;
  advantages: string[];
}

export interface BusinessPlan {
  steps: {
    title: string;
    description: string;
    estimatedTime: string;
  }[];
}

export interface DropshippingPlanWidgetProps {
  interests?: string[];
  onPlanGenerated?: (plan: any) => void;
}

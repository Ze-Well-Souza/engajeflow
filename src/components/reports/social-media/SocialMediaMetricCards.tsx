
import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import MetricCard from "@/components/reports/MetricCard";

const SocialMediaMetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Instagram"
        value="27.5K"
        icon={<Instagram className="h-4 w-4 text-pink-500" />}
        trend={{ value: "12.5%", positive: true }}
      />
      
      <MetricCard
        title="Facebook"
        value="18.3K"
        icon={<Facebook className="h-4 w-4 text-blue-500" />}
        trend={{ value: "5.7%", positive: true }}
      />
      
      <MetricCard
        title="YouTube"
        value="9.8K"
        icon={<Youtube className="h-4 w-4 text-red-500" />}
        trend={{ value: "2.3%", positive: false }}
      />
    </div>
  );
};

export default SocialMediaMetricCards;

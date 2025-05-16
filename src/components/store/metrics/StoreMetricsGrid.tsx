
import React from "react";
import StoreMetricCard from "./StoreMetricCard";
import { Package, Instagram, Facebook, Youtube } from "lucide-react";

const StoreMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StoreMetricCard
        title="Total de Produtos"
        value={142}
        icon={Package}
        iconColor="text-blue-500"
      />
      <StoreMetricCard
        title="Posts Instagram"
        value={47}
        icon={Instagram}
        iconColor="text-purple-500"
      />
      <StoreMetricCard
        title="Posts Facebook"
        value={32}
        icon={Facebook}
        iconColor="text-blue-600"
      />
      <StoreMetricCard
        title="Posts YouTube"
        value={18}
        icon={Youtube}
        iconColor="text-red-500"
      />
    </div>
  );
};

export default StoreMetricsGrid;

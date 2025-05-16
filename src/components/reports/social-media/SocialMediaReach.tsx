
import React from "react";
import SocialMediaChart from "@/components/reports/SocialMediaChart";

interface SocialMediaReachProps {
  data: any[];
}

const SocialMediaReach: React.FC<SocialMediaReachProps> = ({ data }) => {
  return <SocialMediaChart data={data} title="Alcance por Plataforma" />;
};

export default SocialMediaReach;

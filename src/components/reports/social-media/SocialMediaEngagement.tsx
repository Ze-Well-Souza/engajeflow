
import React from "react";
import SocialMediaChart from "@/components/reports/SocialMediaChart";

interface SocialMediaEngagementProps {
  data: any[];
}

const SocialMediaEngagement: React.FC<SocialMediaEngagementProps> = ({ data }) => {
  return <SocialMediaChart data={data} title="Engajamento por Plataforma" />;
};

export default SocialMediaEngagement;

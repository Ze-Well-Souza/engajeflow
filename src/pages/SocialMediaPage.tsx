
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialMediaOverview from "@/components/reports/social-media/SocialMediaOverview";
import SocialMediaEngagement from "@/components/reports/social-media/SocialMediaEngagement";
import SocialMediaMetricCards from "@/components/reports/social-media/SocialMediaMetricCards";

// Dados de exemplo para o SocialMediaEngagement
const engagementData = [
  { name: 'Jan', engagementRate: 4.2, comments: 432, shares: 123 },
  { name: 'Fev', engagementRate: 3.8, comments: 321, shares: 98 },
  { name: 'Mar', engagementRate: 5.1, comments: 543, shares: 211 },
  { name: 'Abr', engagementRate: 4.8, comments: 459, shares: 187 },
  { name: 'Mai', engagementRate: 4.3, comments: 401, shares: 143 },
  { name: 'Jun', engagementRate: 5.2, comments: 587, shares: 231 }
];

const SocialMediaPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Social Media Performance</h1>
      
      <SocialMediaMetricCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaOverview />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaEngagement data={engagementData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaPage;

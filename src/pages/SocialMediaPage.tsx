
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialMediaOverview from "@/components/reports/social-media/SocialMediaOverview";
import SocialMediaEngagement from "@/components/reports/social-media/SocialMediaEngagement";
import SocialMediaMetricCards from "@/components/reports/social-media/SocialMediaMetricCards";

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
            <SocialMediaEngagement data={[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaPage;

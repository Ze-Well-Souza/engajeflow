
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SocialMediaOverview from "@/components/reports/social-media/SocialMediaOverview";
import SocialMediaEngagement from "@/components/reports/social-media/SocialMediaEngagement";
import SocialMediaMetricCards from "@/components/reports/social-media/SocialMediaMetricCards";
import SocialMediaHeader from "@/components/reports/social-media/SocialMediaHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { engagementData, reachData } from "@/components/reports/social-media/mock-data";
import SocialMediaReach from "@/components/reports/social-media/SocialMediaReach";
import SocialMediaRatings from "@/components/reports/social-media/SocialMediaRatings";
import SocialMediaConversion from "@/components/reports/social-media/SocialMediaConversion";

const SocialMediaPage: React.FC = () => {
  const [period, setPeriod] = React.useState("last30days");

  return (
    <div className="space-y-6">
      <SocialMediaHeader 
        title="Desempenho em Redes Sociais" 
        period={period} 
        setPeriod={setPeriod} 
      />
      
      <SocialMediaMetricCards />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="reach">Alcance</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
          <TabsTrigger value="ratings">Avaliações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <SocialMediaOverview engagementData={engagementData} reachData={reachData} />
        </TabsContent>
        
        <TabsContent value="engagement">
          <SocialMediaEngagement data={engagementData} />
        </TabsContent>
        
        <TabsContent value="reach">
          <SocialMediaReach data={reachData} />
        </TabsContent>
        
        <TabsContent value="conversion">
          <SocialMediaConversion />
        </TabsContent>
        
        <TabsContent value="ratings">
          <SocialMediaRatings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaPage;

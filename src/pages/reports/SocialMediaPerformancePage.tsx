
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialMediaHeader from "@/components/reports/social-media/SocialMediaHeader";
import SocialMediaMetricCards from "@/components/reports/social-media/SocialMediaMetricCards";
import SocialMediaOverview from "@/components/reports/social-media/SocialMediaOverview";
import SocialMediaEngagement from "@/components/reports/social-media/SocialMediaEngagement";
import SocialMediaReach from "@/components/reports/social-media/SocialMediaReach";
import SocialMediaConversion from "@/components/reports/social-media/SocialMediaConversion";
import { engagementData, reachData } from "@/components/reports/social-media/mock-data";

const SocialMediaPerformancePage: React.FC = () => {
  const [period, setPeriod] = useState("last30days");

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
      </Tabs>
    </div>
  );
};

export default SocialMediaPerformancePage;

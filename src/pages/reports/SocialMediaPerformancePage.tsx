
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialMediaHeader from "@/components/reports/social-media/SocialMediaHeader";
import SocialMediaMetricCards from "@/components/reports/social-media/SocialMediaMetricCards";
import SocialMediaOverview from "@/components/reports/social-media/SocialMediaOverview";
import SocialMediaEngagement from "@/components/reports/social-media/SocialMediaEngagement";
import SocialMediaReach from "@/components/reports/social-media/SocialMediaReach";
import SocialMediaConversion from "@/components/reports/social-media/SocialMediaConversion";
import SocialMediaRatings from "@/components/reports/social-media/SocialMediaRatings";
import { engagementData, reachData } from "@/components/reports/social-media/mock-data";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const SocialMediaPerformancePage: React.FC = () => {
  const [period, setPeriod] = useState("last30days");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SocialMediaHeader 
          title="Desempenho em Redes Sociais" 
          period={period} 
          setPeriod={setPeriod} 
        />
        <Link to="/ratings">
          <Button variant="outline" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Gerenciar Avaliações
          </Button>
        </Link>
      </div>

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

export default SocialMediaPerformancePage;


import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import SocialMediaChart from "@/components/reports/SocialMediaChart";
import { Card, CardContent } from "@/components/ui/card";

interface SocialMediaOverviewProps {
  engagementData: any[];
  reachData: any[];
}

const SocialMediaOverview: React.FC<SocialMediaOverviewProps> = ({ engagementData, reachData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SocialMediaChart data={engagementData} title="Engajamento" />
        <SocialMediaChart data={reachData} title="Alcance" />
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Principais Postagens</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-900 rounded-md">
                <div className="h-12 w-12 bg-gray-700 rounded-md flex items-center justify-center">
                  {i === 1 ? (
                    <Instagram className="h-6 w-6 text-pink-500" />
                  ) : i === 2 ? (
                    <Facebook className="h-6 w-6 text-blue-500" />
                  ) : (
                    <Youtube className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    {i === 1 ? "Nova coleção primavera" : i === 2 ? "Descontos exclusivos" : "Tutorial de uso"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {i === 1 ? "2.5K curtidas • 150 comentários" : i === 2 ? "1.8K curtidas • 95 comentários" : "3.2K visualizações • 85 likes"}
                  </p>
                </div>
                <div>
                  <span className="text-green-500 font-medium text-sm">+{i === 1 ? "24%" : i === 2 ? "18%" : "32%"}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaOverview;


import React from "react";
import { Facebook, Instagram, Youtube, Filter, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MetricCard from "@/components/reports/MetricCard";
import SocialMediaChart from "@/components/reports/SocialMediaChart";

// Dados de exemplo para os gráficos
const engagementData = [
  { name: "Jan", instagram: 4000, facebook: 2400, youtube: 1200 },
  { name: "Fev", instagram: 3000, facebook: 1398, youtube: 2210 },
  { name: "Mar", instagram: 2000, facebook: 9800, youtube: 2290 },
  { name: "Abr", instagram: 2780, facebook: 3908, youtube: 2000 },
  { name: "Mai", instagram: 1890, facebook: 4800, youtube: 2181 },
  { name: "Jun", instagram: 2390, facebook: 3800, youtube: 2500 }
];

const reachData = [
  { name: "Jan", instagram: 10000, facebook: 5000, youtube: 3000 },
  { name: "Fev", instagram: 12000, facebook: 6000, youtube: 3500 },
  { name: "Mar", instagram: 15000, facebook: 8000, youtube: 4000 },
  { name: "Abr", instagram: 18000, facebook: 9000, youtube: 5000 },
  { name: "Mai", instagram: 20000, facebook: 10000, youtube: 6000 },
  { name: "Jun", instagram: 22000, facebook: 12000, youtube: 7000 }
];

const SocialMediaPerformancePage: React.FC = () => {
  const [period, setPeriod] = React.useState("last30days");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Desempenho em Redes Sociais</h1>
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Últimos 7 dias</SelectItem>
              <SelectItem value="last30days">Últimos 30 dias</SelectItem>
              <SelectItem value="last90days">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="reach">Alcance</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="engagement">
          <SocialMediaChart data={engagementData} title="Engajamento por Plataforma" />
        </TabsContent>
        
        <TabsContent value="reach">
          <SocialMediaChart data={reachData} title="Alcance por Plataforma" />
        </TabsContent>
        
        <TabsContent value="conversion">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Taxa de Conversão</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Instagram</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: "3.2%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Facebook</span>
                      <span className="font-medium">2.8%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "2.8%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>YouTube</span>
                      <span className="font-medium">4.5%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "4.5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Leads por Fonte</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Instagram</span>
                      <span className="font-medium">124</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Facebook</span>
                      <span className="font-medium">87</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>YouTube</span>
                      <span className="font-medium">53</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaPerformancePage;

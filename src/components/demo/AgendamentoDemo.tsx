
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgendamentoBeautySalon from "./AgendamentoBeautySalon";
import AgendamentoDomestica from "./AgendamentoDomestica";
import AgendamentoChef from "./AgendamentoChef";
import AgendamentoHousekeeper from "./AgendamentoHousekeeper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AgendamentoDemoProps {
  onScheduleComplete?: () => void;
}

const AgendamentoDemo: React.FC<AgendamentoDemoProps> = ({ onScheduleComplete }) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Agendar Serviço</CardTitle>
        <CardDescription>
          Escolha o tipo de serviço que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="salon" className="mt-1">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="salon">Salão de Beleza</TabsTrigger>
            <TabsTrigger value="domestica">Doméstica</TabsTrigger>
            <TabsTrigger value="housekeeper">Limpeza</TabsTrigger>
            <TabsTrigger value="chef">Chef</TabsTrigger>
          </TabsList>
          <TabsContent value="salon">
            <AgendamentoBeautySalon onScheduleComplete={onScheduleComplete} />
          </TabsContent>
          <TabsContent value="domestica">
            <AgendamentoDomestica onScheduleComplete={onScheduleComplete} />
          </TabsContent>
          <TabsContent value="housekeeper">
            <AgendamentoHousekeeper onScheduleComplete={onScheduleComplete} />
          </TabsContent>
          <TabsContent value="chef">
            <AgendamentoChef onScheduleComplete={onScheduleComplete} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgendamentoDemo;

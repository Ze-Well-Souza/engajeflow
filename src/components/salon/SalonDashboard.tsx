import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfessionalManagement from "./ProfessionalManagement";
import SpecialtyManagement from "./SpecialtyManagement";
import ServiceManagement from "./ServiceManagement";
import IntelligentBooking from "./IntelligentBooking";

const SalonDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Salão de Beleza</CardTitle>
          <CardDescription>
            Configure e gerencie seu salão de beleza com agendamento inteligente e automação de mensagens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="booking">Agendamento</TabsTrigger>
              <TabsTrigger value="professionals">Profissionais</TabsTrigger>
              <TabsTrigger value="specialties">Especialidades</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
            </TabsList>
            
            <TabsContent value="booking">
              <IntelligentBooking />
            </TabsContent>
            
            <TabsContent value="professionals">
              <ProfessionalManagement />
            </TabsContent>
            
            <TabsContent value="specialties">
              <SpecialtyManagement />
            </TabsContent>
            
            <TabsContent value="services">
              <ServiceManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDashboard;

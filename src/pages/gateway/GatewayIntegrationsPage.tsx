
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Building, Database, ShieldCheck } from "lucide-react";

const GatewayIntegrationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrações</h2>
        <p className="text-muted-foreground">
          Conecte-se a diferentes sistemas e serviços para expandir suas funcionalidades
        </p>
      </div>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payment">Pagamentos</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="messaging">Mensageria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Payment Gateway Cards */}
            <IntegrationCard 
              title="MercadoPago"
              description="Processamento de pagamentos online"
              status="active"
              icon={<Building className="h-8 w-8 text-green-500" />}
            />
            <IntegrationCard 
              title="PagSeguro"
              description="Gateway de pagamentos completo"
              status="available"
              icon={<Building className="h-8 w-8 text-blue-500" />}
            />
            <IntegrationCard 
              title="Stripe"
              description="Pagamentos internacionais"
              status="available"
              icon={<Building className="h-8 w-8 text-purple-500" />}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="crm" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* CRM Cards */}
            <IntegrationCard 
              title="RD Station"
              description="Automação de marketing"
              status="active"
              icon={<Database className="h-8 w-8 text-orange-500" />}
            />
            <IntegrationCard 
              title="HubSpot"
              description="CRM completo"
              status="available"
              icon={<Database className="h-8 w-8 text-blue-500" />}
            />
            <IntegrationCard 
              title="Salesforce"
              description="Gestão de relacionamento"
              status="available"
              icon={<Database className="h-8 w-8 text-purple-500" />}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="messaging" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Messaging Cards */}
            <IntegrationCard 
              title="WhatsApp Business API"
              description="Mensagens via WhatsApp"
              status="active"
              icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
            />
            <IntegrationCard 
              title="Telegram Bot API"
              description="Automação no Telegram"
              status="available"
              icon={<ShieldCheck className="h-8 w-8 text-blue-500" />}
            />
            <IntegrationCard 
              title="Facebook Messenger"
              description="Chat via Messenger"
              status="available"
              icon={<ShieldCheck className="h-8 w-8 text-purple-500" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Integration Card Component
const IntegrationCard = ({ 
  title, 
  description, 
  status,
  icon
}: { 
  title: string; 
  description: string; 
  status: "active" | "available" | "coming-soon";
  icon: React.ReactNode;
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div>{icon}</div>
      </CardHeader>
      
      <CardContent>
        <Badge 
          variant={
            status === "active" ? "default" : 
            status === "available" ? "outline" : 
            "secondary"
          }
          className="mb-2"
        >
          {status === "active" ? "Ativo" : 
           status === "available" ? "Disponível" : 
           "Em breve"}
        </Badge>
        
        <div className="pt-2 text-sm">
          {status === "active" && (
            <div className="flex items-center text-green-600">
              <Check className="h-4 w-4 mr-1" /> Conectado
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={status === "active" ? "outline" : "default"} 
          size="sm" 
          className="w-full"
        >
          {status === "active" ? "Configurar" : "Conectar"}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GatewayIntegrationsPage;

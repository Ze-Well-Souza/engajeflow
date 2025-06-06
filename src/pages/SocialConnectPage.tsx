
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedSocialConnector from '@/components/social/EnhancedSocialConnector';
import SmartAutomations from '@/components/automation/SmartAutomations';
import { Link, Users, Zap } from 'lucide-react';

const SocialConnectPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Link className="h-8 w-8" />
          Conexões Sociais
        </h1>
        <p className="text-muted-foreground mt-2">
          Conecte suas redes sociais e configure automações inteligentes
        </p>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections">
            <Users className="h-4 w-4 mr-2" />
            Conexões
          </TabsTrigger>
          <TabsTrigger value="automations">
            <Zap className="h-4 w-4 mr-2" />
            Automações
          </TabsTrigger>
          <TabsTrigger value="settings">
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="mt-6">
          <EnhancedSocialConnector />
        </TabsContent>

        <TabsContent value="automations" className="mt-6">
          <SmartAutomations />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Configurações avançadas de conexões sociais em desenvolvimento
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialConnectPage;

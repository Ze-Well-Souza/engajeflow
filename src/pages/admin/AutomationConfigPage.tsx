
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Instagram, Calendar, FileText } from "lucide-react";
import MessageAutomation from "@/components/automation/MessageAutomation";
import SocialAutomation from "@/components/automation/SocialAutomation";
import SchedulerAutomation from "@/components/automation/SchedulerAutomation";
import CommunicationTemplates from "@/components/automation/CommunicationTemplates";

const AutomationConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("messaging");
  
  // Estados para os diferentes tipos de automação
  const [postAutomations, setPostAutomations] = useState([
    {
      id: 1,
      channelId: 1,
      platform: "Instagram",
      frequency: "daily",
      templates: ["Template 1", "Template 3"],
      enabled: true
    },
    {
      id: 2,
      channelId: 2,
      platform: "Facebook",
      frequency: "weekly",
      templates: ["Template 2"],
      enabled: false
    }
  ]);

  const [autoResponses, setAutoResponses] = useState([
    {
      id: 1,
      channelId: 1,
      triggers: ["olá", "oi", "bom dia"],
      responses: ["Olá! Como posso ajudar?"],
      enabled: true
    },
    {
      id: 2,
      channelId: 1,
      triggers: ["preço", "valor", "quanto custa"],
      responses: ["Temos opções a partir de R$50. Gostaria de conhecer nossos planos?"],
      enabled: true
    }
  ]);

  // Função para adicionar nova automação de postagem
  const addPostAutomation = () => {
    const newAutomation = {
      id: postAutomations.length + 1,
      channelId: 1,
      platform: "Instagram",
      frequency: "daily",
      templates: [],
      enabled: false
    };
    
    setPostAutomations([...postAutomations, newAutomation]);
  };

  // Função para remover automação de postagem
  const removePostAutomation = (id: number) => {
    setPostAutomations(postAutomations.filter(item => item.id !== id));
  };

  // Função para adicionar nova automação de resposta
  const addAutoResponse = () => {
    const newResponse = {
      id: autoResponses.length + 1,
      channelId: 1,
      triggers: [],
      responses: [],
      enabled: false
    };
    
    setAutoResponses([...autoResponses, newResponse]);
  };

  // Função para remover automação de resposta
  const removeAutoResponse = (id: number) => {
    setAutoResponses(autoResponses.filter(item => item.id !== id));
  };

  // Função para alternar status de ativação
  const toggleEnabled = (type: 'post' | 'response', id: number) => {
    if (type === 'post') {
      setPostAutomations(postAutomations.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ));
    } else {
      setAutoResponses(autoResponses.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuração de Automação</h2>
        <p className="text-muted-foreground">
          Configure automações de comunicação para múltiplos canais
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messaging" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Mensagens
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="scheduler" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agendamento
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messaging" className="space-y-4 mt-4">
          <MessageAutomation 
            autoResponses={autoResponses}
            addAutoResponse={addAutoResponse}
            removeAutoResponse={removeAutoResponse}
            toggleEnabled={(id) => toggleEnabled('response', id)}
          />
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <SocialAutomation 
            postAutomations={postAutomations}
            addPostAutomation={addPostAutomation}
            removePostAutomation={removePostAutomation}
            toggleEnabled={(id) => toggleEnabled('post', id)}
          />
        </TabsContent>

        <TabsContent value="scheduler" className="space-y-4 mt-4">
          <SchedulerAutomation />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4 mt-4">
          <CommunicationTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationConfigPage;


import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgendamentosTabs } from "@/hooks/useAgendamentosTabs";
import AgendamentosHeader from "@/components/agendamentos/AgendamentosHeader";
import StatCards from "@/components/agendamentos/StatCards";
import AgendamentosListaWrapper from "@/components/agendamentos/AgendamentosListaWrapper";
import NovoAgendamento from "@/components/agendamentos/NovoAgendamento";
import { useScheduledPosts } from "@/hooks/useScheduledPosts";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const AgendamentosContent: React.FC = () => {
  const { activeTab, handleTabChange, handleCreateNew, handleListReturn } = useAgendamentosTabs();
  const { posts } = useScheduledPosts(DEMO_CLIENT_ID);

  return (
    <div className="space-y-6">
      <AgendamentosHeader onCreateNew={handleCreateNew} />
      
      <StatCards posts={posts} />

      <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as 'agendamentos' | 'novo')} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="novo">Novo Agendamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agendamentos">
          <AgendamentosListaWrapper onCreateNew={handleCreateNew} />
        </TabsContent>
        
        <TabsContent value="novo">
          <NovoAgendamento onSuccess={handleListReturn} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendamentosContent;

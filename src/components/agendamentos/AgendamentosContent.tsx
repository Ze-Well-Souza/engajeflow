
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgendamentosTabs } from "@/hooks/useAgendamentosTabs";
import AgendamentosHeader from "@/components/agendamentos/AgendamentosHeader";
import StatCards from "@/components/agendamentos/StatCards";
import AgendamentosListaWrapper from "@/components/agendamentos/AgendamentosListaWrapper";
import NovoAgendamento from "@/components/agendamentos/NovoAgendamento";
import { useScheduledPosts } from "@/hooks/useScheduledPosts";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const AgendamentosContent: React.FC = () => {
  const { activeTab, handleTabChange, handleCreateNew, handleListReturn } = useAgendamentosTabs();
  const { posts } = useScheduledPosts(DEMO_CLIENT_ID);

  return (
    <div className="space-y-6">
      <AgendamentosHeader onCreateNew={handleCreateNew} />
      
      <StatCards posts={posts} />
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Conteúdo</h2>
        <Link to="/ratings">
          <Button variant="outline" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Ver Avaliações
          </Button>
        </Link>
      </div>

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

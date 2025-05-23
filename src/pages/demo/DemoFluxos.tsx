
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgendamentoDemo from "@/components/demo/AgendamentoDemo";
import PostagemDemo from "@/components/demo/PostagemDemo";
import GerenciamentoDemo from "@/components/demo/GerenciamentoDemo";

const DemoFluxos: React.FC = () => {
  const { fluxo, segment } = useParams<{ fluxo: string; segment: string }>();
  const navigate = useNavigate();
  const defaultTab = fluxo || "agendamento";
  
  // Redirecionar para a página específica de demonstração para imobiliária
  React.useEffect(() => {
    if (segment === "realestate" && !fluxo) {
      navigate("/demo/realestate");
    }
  }, [segment, fluxo, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agendamento">Agendamento</TabsTrigger>
          <TabsTrigger value="postagem">Postagem</TabsTrigger>
          <TabsTrigger value="gerenciamento">Gerenciamento</TabsTrigger>
        </TabsList>
        <TabsContent value="agendamento" className="mt-6">
          <AgendamentoDemo segment={segment} />
        </TabsContent>
        <TabsContent value="postagem" className="mt-6">
          <PostagemDemo segment={segment} />
        </TabsContent>
        <TabsContent value="gerenciamento" className="mt-6">
          <GerenciamentoDemo segment={segment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoFluxos;

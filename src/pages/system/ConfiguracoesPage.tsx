
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ConfigSidebar from "./components/ConfigSidebar";
import ContaCard from "./components/config/ContaCard";
import LojaCard from "./components/config/LojaCard";
import NotificacoesCard from "./components/config/NotificacoesCard";
import SegurancaCard from "./components/config/SegurancaCard";
import IntegracaoCard from "./components/config/IntegracaoCard";
import AvancadoCard from "./components/config/AvancadoCard";

const ConfiguracoesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-2">
        <div className="md:col-span-1">
          <ConfigSidebar />
        </div>

        <div className="md:col-span-3 space-y-6">
          <ContaCard />
          <LojaCard />
          <NotificacoesCard />
          <SegurancaCard />
          <IntegracaoCard />
          <AvancadoCard />
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;

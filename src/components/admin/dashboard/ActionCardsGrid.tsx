
import React from "react";
import { UsersRound, ShieldCheck, FileText } from "lucide-react";
import ActionCard from "./ActionCard";

const ActionCardsGrid: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ActionCard
        title="Gerenciar Clientes"
        description="Cadastre, edite e gerencie os clientes do sistema"
        icon={UsersRound}
        linkTo="/admin/clientes"
      >
        Acesso a todas as informações de clientes, com opções para cadastro e edição.
      </ActionCard>
      
      <ActionCard
        title="Gerenciar Permissões"
        description="Configure as permissões de acesso para cada cliente"
        icon={ShieldCheck}
        linkTo="/admin/permissoes"
      >
        Defina quais módulos e funcionalidades cada cliente pode acessar de forma granular.
      </ActionCard>
      
      <ActionCard
        title="Logs de Atividades"
        description="Monitore as ações realizadas no sistema"
        icon={FileText}
        linkTo="/admin/logs"
      >
        Visualize registros detalhados de todas as atividades dos usuários no sistema.
      </ActionCard>
    </div>
  );
};

export default ActionCardsGrid;

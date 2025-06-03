
import React from "react";
import { FileText } from "lucide-react";

const EmptyLogs: React.FC = () => {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <FileText className="mx-auto h-12 w-12 mb-2" />
      <p>Nenhum log encontrado para os filtros selecionados.</p>
    </div>
  );
};

export default EmptyLogs;


import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShieldAlert, Key, FileLock, FileKey } from "lucide-react";
import { toast } from "sonner";

const SecurityTools: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Relatórios de Conformidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório LGPD...")}>
              <Users className="mr-2 h-4 w-4" />
              Gerar Relatório LGPD
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório GDPR...")}>
              <Users className="mr-2 h-4 w-4" />
              Gerar Relatório GDPR
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Verificando consentimentos...")}>
              <FileKey className="mr-2 h-4 w-4" />
              Verificar Consentimentos
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ferramentas de Auditoria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando varredura de vulnerabilidades...")}>
              <ShieldAlert className="mr-2 h-4 w-4" />
              Verificar Vulnerabilidades
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando auditoria de tokens...")}>
              <Key className="mr-2 h-4 w-4" />
              Auditoria de Tokens
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => toast.info("Exportando logs de segurança...")}>
              <FileLock className="mr-2 h-4 w-4" />
              Exportar Logs de Segurança
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTools;

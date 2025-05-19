
import React from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ApiDocumentationPage = () => {
  const { t } = useLocalization();
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado para a área de transferência");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">API Pública para Desenvolvedores</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Visão Geral da API</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A API TechZe Connect permite que desenvolvedores externos acessem e integrem funcionalidades 
            da plataforma em suas próprias aplicações. Nossa API RESTful fornece acesso programático 
            a recursos como mensagens, agendamentos, análises e muito mais.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ExternalLink size={16} />
              Documentação Completa
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ExternalLink size={16} />
              Console da API
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="authentication">
        <TabsList className="mb-4">
          <TabsTrigger value="authentication">Autenticação</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Exemplos</TabsTrigger>
          <TabsTrigger value="errors">Erros</TabsTrigger>
        </TabsList>
        
        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A API TechZe Connect usa autenticação baseada em tokens. Para obter um token, você precisa 
                registrar sua aplicação no portal do desenvolvedor.
              </p>
              
              <div className="bg-gray-900 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Exemplo de requisição</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard('curl -X POST "https://api.techze.com/v1/auth/token" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"client_id": "seu_client_id", "client_secret": "seu_client_secret"}\'')}>
                    <Copy size={14} />
                  </Button>
                </div>
                <pre className="text-xs text-gray-300 overflow-x-auto">
{`curl -X POST "https://api.techze.com/v1/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{"client_id": "seu_client_id", "client_secret": "seu_client_secret"}'`}
                </pre>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Resposta</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard('{\n  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "token_type": "bearer",\n  "expires_in": 3600\n}')}>
                    <Copy size={14} />
                  </Button>
                </div>
                <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Outros TabsContent aqui... */}
      </Tabs>
    </div>
  );
};

export default ApiDocumentationPage;

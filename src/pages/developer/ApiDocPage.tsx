
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Book, Server, Download, RefreshCw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ApiDocPage: React.FC = () => {
  const { t } = useLocalization();
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência");
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Documentação da API</h1>
      
      <Tabs defaultValue="rest" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rest">REST API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
          <TabsTrigger value="authentication">Autenticação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rest">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Visão Geral da REST API</CardTitle>
                <Badge variant="outline">v2.0.1</Badge>
              </div>
              <p className="text-muted-foreground">
                Nossa REST API permite que você integre facilmente os recursos EngageFlow em seu próprio aplicativo.
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 p-4 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-sm">Base URL</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-1"
                    onClick={() => handleCopy("https://api.engageflow.com/v2")}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </Button>
                </div>
                <code className="text-green-600 dark:text-green-400">
                  https://api.engageflow.com/v2
                </code>
              </div>
              
              <h3 className="font-semibold text-lg mb-3">Autenticação</h3>
              <p className="mb-4">
                Todas as requisições da API requerem autenticação usando um token de API.
                Os tokens podem ser gerados no painel de controle da sua conta.
              </p>
              
              <div className="bg-secondary/30 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-sm">Header Example</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-1"
                    onClick={() => handleCopy("Authorization: Bearer YOUR_API_TOKEN")}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </Button>
                </div>
                <code className="text-primary dark:text-primary-foreground">
                  Authorization: Bearer YOUR_API_TOKEN
                </code>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Endpoints Disponíveis</CardTitle>
              <p className="text-muted-foreground">
                Explore os endpoints disponíveis para integração com sua aplicação.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Lista de endpoints aqui */}
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-3">
                  <Badge className="mr-2 bg-green-600">GET</Badge>
                  <span className="font-mono text-sm">/campaigns</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Retorna uma lista de todas as campanhas associadas à sua conta.
                </p>
                <Button variant="outline" size="sm" className="gap-1">
                  <Book className="h-3.5 w-3.5" />
                  <span>Ver Documentação</span>
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-3">
                  <Badge className="mr-2 bg-blue-600">POST</Badge>
                  <span className="font-mono text-sm">/campaigns</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Cria uma nova campanha associada à sua conta.
                </p>
                <Button variant="outline" size="sm" className="gap-1">
                  <Book className="h-3.5 w-3.5" />
                  <span>Ver Documentação</span>
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-3">
                  <Badge className="mr-2 bg-amber-600">PUT</Badge>
                  <span className="font-mono text-sm">/campaigns/{"{id}"}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Atualiza uma campanha específica com base no ID fornecido.
                </p>
                <Button variant="outline" size="sm" className="gap-1">
                  <Book className="h-3.5 w-3.5" />
                  <span>Ver Documentação</span>
                </Button>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-3">
                  <Badge className="mr-2 bg-red-600">DELETE</Badge>
                  <span className="font-mono text-sm">/campaigns/{"{id}"}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Remove uma campanha específica com base no ID fornecido.
                </p>
                <Button variant="outline" size="sm" className="gap-1">
                  <Book className="h-3.5 w-3.5" />
                  <span>Ver Documentação</span>
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Baixar OpenAPI Spec
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <p className="text-muted-foreground">
                Configure webhooks para receber notificações em tempo real sobre eventos em sua conta.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Os webhooks permitem que seu aplicativo receba notificações em tempo real
                quando eventos específicos ocorrem em sua conta EngageFlow.
              </p>
              
              <h3 className="font-semibold text-lg mt-6 mb-3">Eventos Disponíveis</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>campaign.created - Quando uma nova campanha é criada</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>campaign.updated - Quando uma campanha é atualizada</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>campaign.deleted - Quando uma campanha é excluída</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>message.sent - Quando uma mensagem é enviada</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>message.failed - Quando uma mensagem falha ao ser enviada</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>customer.created - Quando um novo cliente é criado</span>
                </li>
                <li className="flex items-center">
                  <Server className="h-4 w-4 mr-2 text-primary" />
                  <span>customer.updated - Quando um cliente é atualizado</span>
                </li>
              </ul>
              
              <h3 className="font-semibold text-lg mt-6 mb-3">Formato da Requisição</h3>
              <div className="bg-secondary/30 p-4 rounded-md overflow-auto">
                <pre className="text-sm">
{`{
  "event": "campaign.created",
  "timestamp": "2025-07-15T14:53:21Z",
  "data": {
    "id": "cam_12345",
    "name": "Campanha de Verão 2025",
    "type": "promotional",
    "status": "active",
    "created_at": "2025-07-15T14:53:21Z"
  }
}`}
                </pre>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Configuração de Segurança</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Para segurança adicional, recomendamos que você verifique a assinatura do webhook em cada requisição.
                  Nós incluímos um cabeçalho <code>X-Engageflow-Signature</code> em cada requisição, que você pode usar para verificar
                  a autenticidade da requisição.
                </p>
                
                <div className="bg-secondary/30 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm">Verificação da Assinatura (Node.js)</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handleCopy(`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>
                  <pre className="text-sm overflow-auto">
{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sdks">
          <Card>
            <CardHeader>
              <CardTitle>SDKs & Bibliotecas</CardTitle>
              <p className="text-muted-foreground">
                Utilize nossas bibliotecas oficiais para integrar com a API EngageFlow.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-amber-600 flex items-center justify-center text-white mr-3">
                        <Code className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">JavaScript/Node.js</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      SDK oficial para JavaScript e aplicações Node.js
                    </p>
                    <div className="bg-secondary/30 p-3 rounded-md text-xs font-mono mb-3">
                      npm install @engageflow/sdk
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">GitHub</Button>
                      <Button variant="outline" size="sm">Documentação</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white mr-3">
                        <Code className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">Python</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      SDK oficial para aplicações Python
                    </p>
                    <div className="bg-secondary/30 p-3 rounded-md text-xs font-mono mb-3">
                      pip install engageflow-sdk
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">GitHub</Button>
                      <Button variant="outline" size="sm">Documentação</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center text-white mr-3">
                        <Code className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">PHP</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      SDK oficial para aplicações PHP
                    </p>
                    <div className="bg-secondary/30 p-3 rounded-md text-xs font-mono mb-3">
                      composer require engageflow/sdk
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">GitHub</Button>
                      <Button variant="outline" size="sm">Documentação</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-green-600 flex items-center justify-center text-white mr-3">
                        <Code className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">Go</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      SDK oficial para aplicações Go
                    </p>
                    <div className="bg-secondary/30 p-3 rounded-md text-xs font-mono mb-3">
                      go get github.com/engageflow/sdk
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">GitHub</Button>
                      <Button variant="outline" size="sm">Documentação</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="pt-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Não encontrou SDK para sua linguagem preferida? Confira nossos exemplos de código.
                </p>
                <Button className="gap-1">
                  <Code className="h-4 w-4" />
                  Ver exemplos de código
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação e Tokens</CardTitle>
              <p className="text-muted-foreground">
                Saiba como autenticar com nossa API e gerenciar seus tokens
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Tipos de Token</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge className="bg-blue-600">Pessoal</Badge>
                      <span>Token de Acesso Pessoal</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Use para testes e desenvolvimento. Acesso total à API usando suas permissões de usuário.
                      Não recomendado para produção.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge className="bg-green-600">Aplicação</Badge>
                      <span>Token de Aplicação</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Para uso em produção. Permissões específicas e limite de acesso. 
                      Pode ser revogado a qualquer momento.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge className="bg-amber-600">Webhook</Badge>
                      <span>Token de Signing</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Usado para verificar a autenticidade de webhooks. Não dá acesso à API,
                      apenas valida assinaturas.
                    </p>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Badge className="bg-purple-600">Cliente</Badge>
                      <span>Client-side Token</span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Token com permissões muito limitadas para uso em aplicações frontend.
                      Acesso somente a endpoints públicos.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Gerando um Token</h3>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p>Acesse o painel de desenvolvedor em seu perfil</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p>Selecione "API Tokens" no menu lateral</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p>Clique em "Gerar Novo Token" e preencha as informações</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <p>Configure as permissões específicas para o token</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                    <div>
                      <p>Copie o token e guarde-o em um local seguro (ele não será exibido novamente)</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Exemplo de Uso do Token</h3>
                <div className="bg-secondary/30 p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm">Exemplo de Requisição (cURL)</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={() => handleCopy(`curl -X GET 'https://api.engageflow.com/v2/campaigns' \\
  -H 'Authorization: Bearer YOUR_API_TOKEN' \\
  -H 'Content-Type: application/json'`)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </Button>
                  </div>
                  <pre className="text-sm overflow-auto">
{`curl -X GET 'https://api.engageflow.com/v2/campaigns' \\
  -H 'Authorization: Bearer YOUR_API_TOKEN' \\
  -H 'Content-Type: application/json'`}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button variant="outline" className="gap-1">
                  <Terminal className="h-4 w-4" />
                  Testar no Console
                </Button>
                <Button className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Gerar Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocPage;

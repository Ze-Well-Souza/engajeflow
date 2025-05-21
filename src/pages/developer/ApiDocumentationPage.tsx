
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Book, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApiDocumentationPage: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Documentação da API</h1>
      
      <Tabs defaultValue="rest" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="rest">REST API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rest">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Visão Geral da REST API</CardTitle>
                <Badge variant="outline">v2.0.1</Badge>
              </div>
              <p className="text-muted-foreground">
                Nossa REST API permite que você integre facilmente os recursos TechCare em seu próprio aplicativo.
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 p-4 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-sm">Base URL</div>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar</span>
                  </Button>
                </div>
                <code className="text-green-600 dark:text-green-400">
                  https://api.techcare.com/v2
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
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
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
                quando eventos específicos ocorrem em sua conta TechCare.
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
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sdks">
          <Card>
            <CardHeader>
              <CardTitle>SDKs & Bibliotecas</CardTitle>
              <p className="text-muted-foreground">
                Utilize nossas bibliotecas oficiais para integrar com a API TechCare.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded bg-red-600 flex items-center justify-center text-white mr-3">
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
                      npm install @techcare/sdk
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
                      pip install techcare-sdk
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">GitHub</Button>
                      <Button variant="outline" size="sm">Documentação</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentationPage;

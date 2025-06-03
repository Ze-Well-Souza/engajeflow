
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Video, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const ContentPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Conteúdo</h1>
          <p className="text-muted-foreground">
            Gerencie seu conteúdo para diferentes plataformas
          </p>
        </div>
        <Button>Criar Novo Conteúdo</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Blog Posts
            </CardTitle>
            <CardDescription>Artigos e publicações para seu blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">12</span>
              <Button variant="outline" size="sm">Ver todos</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5 text-purple-500" />
              Mídias
            </CardTitle>
            <CardDescription>Fotos e imagens para redes sociais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">47</span>
              <Button variant="outline" size="sm">Ver todas</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-red-500" />
              Vídeos
            </CardTitle>
            <CardDescription>Conteúdo em vídeo para suas plataformas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">8</span>
              <Button variant="outline" size="sm">Ver todos</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Módulos de Conteúdo</CardTitle>
          <CardDescription>
            Acesse os diferentes módulos de gestão de conteúdo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Gerencie publicações para Instagram, Facebook, Twitter e mais
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/content/social">Acessar</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Rifas Online</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Crie e gerencie rifas e sorteios para seus clientes
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/content/rifa">Acessar</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Email Marketing</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Crie campanhas de email e gerenciamento de listas
                </p>
                <Button variant="outline" className="w-full">Acessar</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recentes" className="mt-6">
        <TabsList>
          <TabsTrigger value="recentes">Conteúdos Recentes</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recentes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdos Recentes</CardTitle>
              <CardDescription>
                Últimos conteúdos criados ou modificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      {i % 3 === 0 ? (
                        <Video className="h-8 w-8 p-1 bg-red-100 text-red-600 rounded-md" />
                      ) : i % 2 === 0 ? (
                        <Image className="h-8 w-8 p-1 bg-purple-100 text-purple-600 rounded-md" />
                      ) : (
                        <MessageSquare className="h-8 w-8 p-1 bg-blue-100 text-blue-600 rounded-md" />
                      )}
                      <div>
                        <p className="font-medium">Título do Conteúdo {i}</p>
                        <p className="text-xs text-muted-foreground">
                          Modificado em {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Visualizar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agendados" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdos Agendados</CardTitle>
              <CardDescription>
                Próximas publicações programadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma publicação agendada no momento</p>
                <Button className="mt-4">Agendar Publicação</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="desempenho" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho do Conteúdo</CardTitle>
              <CardDescription>
                Métricas e análises de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p>Os gráficos de desempenho serão exibidos aqui</p>
                <Button className="mt-4" variant="outline">Gerar Relatório</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentPage;

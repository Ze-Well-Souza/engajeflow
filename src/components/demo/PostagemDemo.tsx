
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PostagemWhatsAppSeller from "@/components/fluxos/PostagemWhatsAppSeller";
import PostagemSnackShop from "@/components/fluxos/PostagemSnackShop";

interface PostagemDemoProps {
  segment?: string;
  title?: string;
  postTypes?: { id: string; name: string }[];
  scheduledPosts?: { id: string; title: string; type: string; date: string; platforms: string[] }[];
  publishedPosts?: { id: string; title: string; type: string; date: string; platforms: string[]; stats?: { likes: number; comments: number; shares: number } }[];
}

const PostagemDemo: React.FC<PostagemDemoProps> = ({
  segment = "beauty",
  title,
  postTypes,
  scheduledPosts,
  publishedPosts
}) => {
  // Conteúdo personalizado por segmento
  if (segment === "whatsapp-seller") {
    return <PostagemWhatsAppSeller />;
  }
  
  if (segment === "snack-shop") {
    return <PostagemSnackShop />;
  }
  
  // Título dinâmico baseado na prop ou no segmento
  const pageTitle = title || (
    segment === "beauty" ? "Gestão de Conteúdo para Salões" :
    segment === "food" ? "Gestão de Conteúdo para Alimentação" :
    segment === "freelancer" ? "Gestão de Conteúdo para Serviços" :
    segment === "content-creator" ? "Gestão de Conteúdo para Criadores" :
    segment === "education" ? "Gestão de Conteúdo para Educação" :
    segment === "ecommerce" ? "Gestão de Conteúdo para E-commerce" :
    segment === "hr" ? "Gestão de Conteúdo para RH" :
    segment === "accounting" ? "Gestão de Conteúdo para Contabilidade" :
    segment === "realestate" ? "Gestão de Conteúdo para Imobiliárias" :
    "Gestão de Conteúdo"
  );

  // Tipos de postagem padrão
  const defaultPostTypes = postTypes || [
    { id: "1", name: "Promoção" },
    { id: "2", name: "Antes e Depois" },
    { id: "3", name: "Dicas" },
    { id: "4", name: "Depoimento" }
  ];

  // Postagens agendadas padrão
  const defaultScheduledPosts = scheduledPosts || [
    { 
      id: "1", 
      title: "Promoção de Terça", 
      type: "Promoção", 
      date: "24/05/2025", 
      platforms: ["Instagram", "Facebook", "WhatsApp"]
    },
    { 
      id: "2", 
      title: "Novo Serviço de Hidratação", 
      type: "Novidade", 
      date: "26/05/2025", 
      platforms: ["Instagram", "Facebook"]
    },
    { 
      id: "3", 
      title: "Dicas de Cuidados Diários", 
      type: "Dicas", 
      date: "28/05/2025", 
      platforms: ["Instagram", "WhatsApp"]
    }
  ];

  // Postagens publicadas padrão
  const defaultPublishedPosts = publishedPosts || [
    { 
      id: "4", 
      title: "Promoção de Segunda", 
      type: "Promoção", 
      date: "15/05/2025", 
      platforms: ["Instagram", "Facebook", "WhatsApp"],
      stats: { likes: 45, comments: 12, shares: 8 }
    },
    { 
      id: "5", 
      title: "Transformação Cliente Maria", 
      type: "Antes e Depois", 
      date: "10/05/2025", 
      platforms: ["Instagram", "Facebook"],
      stats: { likes: 67, comments: 23, shares: 15 }
    },
    { 
      id: "6", 
      title: "Como manter o corte por mais tempo", 
      type: "Dicas", 
      date: "05/05/2025", 
      platforms: ["Instagram", "WhatsApp"],
      stats: { likes: 38, comments: 7, shares: 12 }
    }
  ];

  const getBadgeColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "facebook":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "whatsapp":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{pageTitle}</CardTitle>
        <CardDescription>
          Gerencie suas postagens em redes sociais e mantenha-se conectado com seus clientes
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scheduled">Agendados</TabsTrigger>
            <TabsTrigger value="published">Publicados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Postagens Agendadas</h3>
              <Button size="sm">Novo Post</Button>
            </div>
            
            {defaultScheduledPosts.map((post) => (
              <div key={post.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Tipo: {post.type}</p>
                  </div>
                  <p className="text-sm font-medium">{post.date}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.platforms.map((platform) => (
                    <Badge key={platform} className={getBadgeColor(platform)}>
                      {platform}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Editar</Button>
                  <Button variant="outline" size="sm">Cancelar</Button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Postagens Publicadas</h3>
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                Exportar
              </Button>
            </div>
            
            {defaultPublishedPosts.map((post) => (
              <div key={post.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Tipo: {post.type}</p>
                  </div>
                  <p className="text-sm font-medium">{post.date}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.platforms.map((platform) => (
                    <Badge key={platform} className={getBadgeColor(platform)}>
                      {platform}
                    </Badge>
                  ))}
                </div>
                
                {post.stats && (
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="border rounded p-2">
                      <div className="font-medium">{post.stats.likes}</div>
                      <div className="text-xs text-gray-500">Curtidas</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">{post.stats.comments}</div>
                      <div className="text-xs text-gray-500">Comentários</div>
                    </div>
                    <div className="border rounded p-2">
                      <div className="font-medium">{post.stats.shares}</div>
                      <div className="text-xs text-gray-500">Compartilhamentos</div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                    Ver Análise
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostagemDemo;

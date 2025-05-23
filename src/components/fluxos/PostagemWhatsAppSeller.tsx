
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PostagemWhatsAppSeller: React.FC = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleCreatePost = () => {
    setIsCreating(true);

    // Simulação de envio para grupos
    setTimeout(() => {
      setIsCreating(false);
      setIsSuccess(true);

      // Reset após 3 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Lista de grupos WhatsApp simulados
  const whatsappGroups = [
    { id: "1", name: "Ofertas Diárias", members: 245 },
    { id: "2", name: "Liquidação Total", members: 187 },
    { id: "3", name: "Clientes Premium", members: 64 },
    { id: "4", name: "Novidades da Semana", members: 156 },
    { id: "5", name: "Descontos Exclusivos", members: 98 },
    { id: "6", name: "Lista VIP", members: 42 }
  ];

  // Lista de campanhas recentes
  const recentCampaigns = [
    {
      id: "1",
      title: "Promoção de Fim de Semana",
      date: "21/05/2025",
      groups: 4,
      messages: 572,
      clicks: 128
    },
    {
      id: "2",
      title: "Lançamento Nova Coleção",
      date: "15/05/2025",
      groups: 6,
      messages: 843,
      clicks: 215
    },
    {
      id: "3",
      title: "Desconto para Clientes VIP",
      date: "10/05/2025",
      groups: 2,
      messages: 132,
      clicks: 87
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b">
        <CardTitle className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-green-500"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
          </svg>
          Divulgação em Grupos WhatsApp
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="create">Criar Mensagem</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            {isSuccess ? (
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Mensagem Enviada!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Sua mensagem foi enviada com sucesso para {selectedGroups.length} grupos ({whatsappGroups.filter(g => selectedGroups.includes(g.id)).reduce((acc, g) => acc + g.members, 0)} membros).
                </p>
                <Button 
                  onClick={() => {
                    setSelectedGroups([]);
                    setIsSuccess(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Criar Nova Mensagem
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Campanha</Label>
                  <Input id="title" placeholder="Ex: Promoção Flash de Outono" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Digite sua mensagem aqui..."
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="media">Mídia</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                      Adicionar Imagem
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                        <path d="m14 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 9"></path>
                        <path d="M16 6h6v6"></path>
                        <path d="M22 2 12 12"></path>
                      </svg>
                      Adicionar Link
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Selecionar Grupos</Label>
                  <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                    {whatsappGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2 py-2 border-b last:border-0">
                        <Checkbox 
                          id={`group-${group.id}`} 
                          checked={selectedGroups.includes(group.id)} 
                          onCheckedChange={() => handleSelectGroup(group.id)}
                        />
                        <label htmlFor={`group-${group.id}`} className="flex-grow cursor-pointer flex justify-between">
                          <span>{group.name}</span>
                          <span className="text-sm text-gray-500">{group.members} membros</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule">Programação</Label>
                  <Select defaultValue="now">
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Quando enviar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Enviar Agora</SelectItem>
                      <SelectItem value="later">Agendar para Mais Tarde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleCreatePost}
                    disabled={selectedGroups.length === 0 || isCreating}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isCreating ? "Enviando..." : `Enviar para ${selectedGroups.length} grupos`}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="campaigns">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Campanhas Recentes</h3>
                <Button variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                  Exportar
                </Button>
              </div>
              
              {recentCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{campaign.title}</h4>
                        <p className="text-sm text-gray-500">{campaign.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"></path></svg>
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                      <div className="border rounded-md p-2">
                        <div className="font-medium">{campaign.groups}</div>
                        <div className="text-xs text-gray-500">Grupos</div>
                      </div>
                      <div className="border rounded-md p-2">
                        <div className="font-medium">{campaign.messages}</div>
                        <div className="text-xs text-gray-500">Mensagens</div>
                      </div>
                      <div className="border rounded-md p-2">
                        <div className="font-medium">{campaign.clicks}</div>
                        <div className="text-xs text-gray-500">Cliques</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Anúncio de Produto</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Template para divulgação de novos produtos ou promoções.
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Usar Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Oferta Limitada</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Template para criar senso de urgência em ofertas por tempo limitado.
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Usar Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Catálogo de Produtos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Template para apresentar múltiplos produtos com descrições breves.
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Usar Template</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Anúncio de Evento</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Template para divulgar eventos, lives ou lançamentos.
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Usar Template</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                Criar Novo Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostagemWhatsAppSeller;

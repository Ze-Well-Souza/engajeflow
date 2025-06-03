
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const PostagemSnackShop: React.FC = () => {
  const [activeTab, setActiveTab] = useState("catalogo");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lista de produtos
  const produtos = [
    { 
      id: "1", 
      nome: "Coxinha de Frango", 
      descricao: "Coxinha tradicional recheada com frango desfiado",
      preco: "R$ 6,50",
      disponivel: true,
      destaque: true,
      imagem: "https://placehold.co/100x100/orange/white?text=Coxinha"
    },
    { 
      id: "2", 
      nome: "Empadinha de Palmito", 
      descricao: "Massa artesanal com recheio de palmito",
      preco: "R$ 7,00",
      disponivel: true,
      destaque: false,
      imagem: "https://placehold.co/100x100/beige/black?text=Empadinha"
    },
    { 
      id: "3", 
      nome: "Quiche de Queijo", 
      descricao: "Quiche com recheio de queijo e ervas finas",
      preco: "R$ 8,50",
      disponivel: true,
      destaque: true,
      imagem: "https://placehold.co/100x100/yellow/black?text=Quiche"
    },
    { 
      id: "4", 
      nome: "Pão de Queijo", 
      descricao: "Pão de queijo mineiro tradicional",
      preco: "R$ 4,00",
      disponivel: true,
      destaque: false,
      imagem: "https://placehold.co/100x100/gold/black?text=PãoQueijo"
    },
    { 
      id: "5", 
      nome: "Bolo de Cenoura", 
      descricao: "Fatia de bolo de cenoura com cobertura de chocolate",
      preco: "R$ 7,50",
      disponivel: true,
      destaque: true,
      imagem: "https://placehold.co/100x100/orange/white?text=Bolo"
    }
  ];

  const handlePublish = () => {
    setIsPublishing(true);

    // Simulação de publicação
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);

      // Reset após 3 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-amber-50 dark:bg-amber-900/20 border-b">
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
            className="h-5 w-5 text-amber-500"
          >
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"></path>
          </svg>
          Cardápio Digital - Lojinha de Salgados
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="catalogo">Cardápio</TabsTrigger>
            <TabsTrigger value="novidades">Novidades</TabsTrigger>
            <TabsTrigger value="promocao">Promoção</TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalogo">
            {isSuccess ? (
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Cardápio Publicado!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Seu cardápio foi atualizado e compartilhado em suas redes sociais.
                </p>
                <Button onClick={() => setIsSuccess(false)} className="bg-amber-600 hover:bg-amber-700">
                  Voltar ao Cardápio
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Produtos em Destaque</h3>
                  <Button variant="outline" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                    Adicionar Produto
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {produtos.map((produto) => (
                    <div key={produto.id} className="border rounded-md p-4 flex gap-4">
                      <div className="w-[80px] h-[80px] bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{produto.nome}</h4>
                          <span className="text-amber-600 font-medium">{produto.preco}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{produto.descricao}</p>
                        
                        <div className="flex items-center gap-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`disponivel-${produto.id}`}>Disponível</Label>
                            <Switch id={`disponivel-${produto.id}`} checked={produto.disponivel} />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`destaque-${produto.id}`}>Destaque</Label>
                            <Switch id={`destaque-${produto.id}`} checked={produto.destaque} />
                          </div>
                          
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="canais" className="mb-2 block">Compartilhar em</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="whatsapp" className="rounded" defaultChecked />
                          <Label htmlFor="whatsapp">Status do WhatsApp</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="instagram" className="rounded" defaultChecked />
                          <Label htmlFor="instagram">Story do Instagram</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="facebook" className="rounded" defaultChecked />
                          <Label htmlFor="facebook">Facebook</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="horario" className="mb-2 block">Horário de Funcionamento</Label>
                      <Select defaultValue="padrao">
                        <SelectTrigger id="horario">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="padrao">Padrão (09:00-18:00)</SelectItem>
                          <SelectItem value="estendido">Estendido (09:00-22:00)</SelectItem>
                          <SelectItem value="feriado">Feriado (10:00-16:00)</SelectItem>
                          <SelectItem value="personalizado">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  {isPublishing ? "Publicando..." : "Publicar Cardápio"}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="novidades">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome-produto">Nome do Produto</Label>
                <Input id="nome-produto" placeholder="Ex: Croissant de Chocolate" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao-produto">Descrição</Label>
                <Textarea 
                  id="descricao-produto" 
                  placeholder="Descreva os detalhes do produto, ingredientes, etc."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco-produto">Preço</Label>
                  <Input id="preco-produto" placeholder="R$ 0,00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria-produto">Categoria</Label>
                  <Select>
                    <SelectTrigger id="categoria-produto">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salgados">Salgados</SelectItem>
                      <SelectItem value="doces">Doces</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="combos">Combos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imagem-produto">Foto do Produto</Label>
                <div className="flex items-center gap-4">
                  <div className="w-[100px] h-[100px] bg-gray-100 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                  </div>
                  <Button variant="outline">Escolher Imagem</Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="destaque-novidade" />
                <Label htmlFor="destaque-novidade">Destacar como novidade</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="anunciar-novidade" />
                <Label htmlFor="anunciar-novidade">Anunciar em todas as redes sociais</Label>
              </div>
              
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Adicionar ao Cardápio
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="promocao">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="promo-titulo">Título da Promoção</Label>
                <Input id="promo-titulo" placeholder="Ex: Oferta Relâmpago de Quarta" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="promo-descricao">Descrição da Promoção</Label>
                <Textarea 
                  id="promo-descricao" 
                  placeholder="Detalhe sua promoção, prazos, condições, etc."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Produtos em Promoção</Label>
                <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                  {produtos.map((produto) => (
                    <div key={produto.id} className="flex items-center space-x-2 py-2 border-b last:border-0">
                      <input 
                        type="checkbox" 
                        id={`promo-${produto.id}`} 
                        className="rounded"
                      />
                      <label htmlFor={`promo-${produto.id}`} className="flex-grow cursor-pointer flex justify-between">
                        <span>{produto.nome}</span>
                        <span className="text-sm text-gray-500">{produto.preco}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promo-tipo">Tipo de Promoção</Label>
                  <Select defaultValue="desconto">
                    <SelectTrigger id="promo-tipo">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desconto">Desconto em %</SelectItem>
                      <SelectItem value="valor">Valor Fixo</SelectItem>
                      <SelectItem value="combo">Combo</SelectItem>
                      <SelectItem value="brinde">Brinde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promo-valor">Valor do Desconto</Label>
                  <Input id="promo-valor" placeholder="Ex: 15%" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promo-inicio">Data de Início</Label>
                  <Input id="promo-inicio" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promo-fim">Data de Término</Label>
                  <Input id="promo-fim" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Canais de Divulgação</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path></svg>
                    Status do WhatsApp
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-pink-500"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    Story do Instagram
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-blue-500"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-red-500"><path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path><polygon points="10 15 15 12 10 9"></polygon></svg>
                    YouTube
                  </Button>
                </div>
              </div>
              
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Criar e Agendar Promoção
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostagemSnackShop;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Image, Upload, Calendar, Clock, Cake, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface PostagemSnackShopProps {
  onPostComplete: (data: any) => void;
}

const PostagemSnackShop: React.FC<PostagemSnackShopProps> = ({ onPostComplete }) => {
  const [activeTab, setActiveTab] = useState("cardapio");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [isPromotion, setIsPromotion] = useState(false);
  const [promotionPrice, setPromotionPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["whatsapp"]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const productCategories = [
    { value: "salgados", label: "Salgados" },
    { value: "doces", label: "Doces" },
    { value: "bolos", label: "Bolos" },
    { value: "bebidas", label: "Bebidas" },
    { value: "kits", label: "Kits Festa" }
  ];

  const platforms = [
    { id: "whatsapp", name: "WhatsApp", icon: "📱" },
    { id: "instagram", name: "Instagram", icon: "📸" },
    { id: "facebook", name: "Facebook", icon: "👍" },
    { id: "ifood", name: "iFood", icon: "🍔" }
  ];

  // Dados simulados para o cardápio
  const menuItems = [
    {
      id: "1",
      name: "Coxinha de Frango",
      description: "Coxinha tradicional recheada com frango desfiado e catupiry",
      price: "5,00",
      category: "Salgados",
      image: "https://placehold.co/300x200/fef3c7/92400e?text=Coxinha",
      isPromotion: false,
      promotionPrice: "",
      isAvailable: true
    },
    {
      id: "2",
      name: "Brigadeiro Gourmet",
      description: "Brigadeiro tradicional com chocolate belga e granulado",
      price: "3,50",
      category: "Doces",
      image: "https://placehold.co/300x200/fee2e2/991b1b?text=Brigadeiro",
      isPromotion: true,
      promotionPrice: "3,00",
      isAvailable: true
    },
    {
      id: "3",
      name: "Bolo de Chocolate",
      description: "Bolo de chocolate com cobertura de brigadeiro e morangos",
      price: "45,00",
      category: "Bolos",
      image: "https://placehold.co/300x200/e9d5ff/4c1d95?text=Bolo+Chocolate",
      isPromotion: false,
      promotionPrice: "",
      isAvailable: true
    },
    {
      id: "4",
      name: "Kit Festa 50 Salgados",
      description: "Mix com 50 salgados variados: coxinha, bolinha de queijo, risole e empada",
      price: "75,00",
      category: "Kits",
      image: "https://placehold.co/300x200/dbeafe/1e40af?text=Kit+Festa",
      isPromotion: true,
      promotionPrice: "65,00",
      isAvailable: true
    }
  ];

  // Dados simulados para promoções
  const promotions = [
    {
      id: "1",
      title: "Quinta do Doce",
      description: "Toda quinta-feira, todos os doces com 20% de desconto",
      startDate: "2025-05-01",
      endDate: "2025-05-31",
      image: "https://placehold.co/300x200/fee2e2/991b1b?text=Promo+Doces",
      platforms: ["WhatsApp", "Instagram", "Facebook"],
      status: "active"
    },
    {
      id: "2",
      title: "Kit Festa com Frete Grátis",
      description: "Na compra de qualquer Kit Festa, o frete é por nossa conta",
      startDate: "2025-05-15",
      endDate: "2025-06-15",
      image: "https://placehold.co/300x200/dbeafe/1e40af?text=Frete+Grátis",
      platforms: ["WhatsApp", "Instagram"],
      status: "scheduled"
    },
    {
      id: "3",
      title: "Compre 10, Leve 12",
      description: "Na compra de 10 salgados do mesmo tipo, leve 12",
      startDate: "2025-04-01",
      endDate: "2025-04-30",
      image: "https://placehold.co/300x200/fef3c7/92400e?text=Compre+10+Leve+12",
      platforms: ["WhatsApp", "Facebook", "iFood"],
      status: "ended"
    }
  ];

  // Dados simulados para pedidos
  const orders = [
    {
      id: "1",
      customer: "Maria Silva",
      items: [
        { name: "Coxinha de Frango", quantity: 20, price: "5,00" },
        { name: "Brigadeiro Gourmet", quantity: 15, price: "3,00" }
      ],
      total: "145,00",
      date: "2025-05-20",
      time: "15:30",
      status: "confirmed",
      deliveryMethod: "Retirada na Loja"
    },
    {
      id: "2",
      customer: "João Santos",
      items: [
        { name: "Bolo de Chocolate", quantity: 1, price: "45,00" }
      ],
      total: "45,00",
      date: "2025-05-22",
      time: "10:00",
      status: "pending",
      deliveryMethod: "Entrega"
    },
    {
      id: "3",
      customer: "Ana Oliveira",
      items: [
        { name: "Kit Festa 50 Salgados", quantity: 1, price: "65,00" },
        { name: "Brigadeiro Gourmet", quantity: 20, price: "3,00" }
      ],
      total: "125,00",
      date: "2025-05-25",
      time: "14:00",
      status: "scheduled",
      deliveryMethod: "Retirada na Loja"
    }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId) 
        : [...prev, platformId]
    );
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulação de upload com progresso
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Dados para enviar ao componente pai
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        isPromotion,
        promotionPrice: isPromotion ? promotionPrice : "",
        isAvailable,
        platforms: selectedPlatforms.map(id => platforms.find(p => p.id === id)?.name),
        image: "https://placehold.co/300x200/fef3c7/92400e?text=" + encodeURIComponent(productName),
        status: 'published',
        createdAt: new Date().toISOString()
      };
      
      onPostComplete(productData);
    }, 1500);
  };

  const isFormValid = () => {
    return (
      productName !== "" && 
      productDescription !== "" && 
      productPrice !== "" && 
      productCategory !== "" && 
      (!isPromotion || (isPromotion && promotionPrice !== "")) &&
      selectedPlatforms.length > 0
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="cardapio">Cardápio</TabsTrigger>
          <TabsTrigger value="promocoes">Promoções</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
        </TabsList>
        
        {/* Cardápio */}
        <TabsContent value="cardapio">
          {!isComplete ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novo Item ao Cardápio</CardTitle>
                  <CardDescription>
                    Cadastre um novo produto para exibir em seu cardápio digital
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Nome do Produto</Label>
                      <Input
                        id="productName"
                        placeholder="Ex: Coxinha de Frango"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productCategory">Categoria</Label>
                      <Select value={productCategory} onValueChange={setProductCategory}>
                        <SelectTrigger id="productCategory">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Descrição</Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Descreva os ingredientes e características do produto"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Preço (R$)</Label>
                      <Input
                        id="productPrice"
                        placeholder="Ex: 5,00"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isPromotion">Produto em Promoção</Label>
                        <Switch 
                          id="isPromotion" 
                          checked={isPromotion}
                          onCheckedChange={setIsPromotion}
                        />
                      </div>
                      
                      {isPromotion && (
                        <Input
                          id="promotionPrice"
                          placeholder="Preço promocional (R$)"
                          value={promotionPrice}
                          onChange={(e) => setPromotionPrice(e.target.value)}
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Foto do Produto</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-pink-400 dark:hover:border-pink-600 transition-colors">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <p className="font-medium">Clique para selecionar ou arraste uma imagem aqui</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Suporta JPG, PNG ou GIF até 5MB
                        </p>
                      </div>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Enviando imagem...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-pink-600 h-2 rounded-full" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Disponibilidade</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="isAvailable" 
                        checked={isAvailable}
                        onCheckedChange={setIsAvailable}
                      />
                      <Label htmlFor="isAvailable">
                        {isAvailable ? "Produto disponível" : "Produto indisponível"}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Plataformas de Divulgação</Label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <Badge
                          key={platform.id}
                          variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedPlatforms.includes(platform.id) 
                              ? 'bg-pink-600 hover:bg-pink-700' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => togglePlatform(platform.id)}
                        >
                          <div className="flex items-center gap-1">
                            <span>{platform.icon}</span>
                            <span>{platform.name}</span>
                          </div>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!isFormValid() || isSubmitting}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    {isSubmitting ? "Salvando..." : "Adicionar ao Cardápio"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Cardápio</CardTitle>
                  <CardDescription>
                    Gerencie os produtos disponíveis em seu cardápio digital
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems.map((item) => (
                      <Card 
                        key={item.id} 
                        className="cursor-pointer hover:border-pink-300 dark:hover:border-pink-700 transition-colors"
                        onClick={() => handleProductClick(item)}
                      >
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          {item.isPromotion && (
                            <Badge className="absolute top-2 right-2 bg-pink-600">
                              Promoção
                            </Badge>
                          )}
                          {!item.isAvailable && (
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center rounded-t-lg">
                              <Badge variant="outline" className="bg-gray-800 text-white border-gray-600">
                                Indisponível
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-right">
                              {item.isPromotion ? (
                                <div>
                                  <p className="text-xs line-through text-gray-500">R$ {item.price}</p>
                                  <p className="font-medium text-pink-600">R$ {item.promotionPrice}</p>
                                </div>
                              ) : (
                                <p className="font-medium">R$ {item.price}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-pink-600">Produto Adicionado!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-pink-600" />
                  </div>
                  
                  <p className="text-lg">
                    <span className="font-medium">{productName}</span> foi adicionado ao seu cardápio com sucesso!
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{productName}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {productDescription}
                        </p>
                      </div>
                      <div className="text-right">
                        {isPromotion ? (
                          <div>
                            <p className="text-xs line-through text-gray-500">R$ {productPrice}</p>
                            <p className="font-medium text-pink-600">R$ {promotionPrice}</p>
                          </div>
                        ) : (
                          <p className="font-medium">R$ {productPrice}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {productCategories.find(c => c.value === productCategory)?.label || productCategory}
                      </Badge>
                      
                      {selectedPlatforms.map(id => {
                        const platform = platforms.find(p => p.id === id);
                        return platform ? (
                          <Badge key={platform.id} variant="secondary">
                            <div className="flex items-center gap-1">
                              <span>{platform.icon}</span>
                              <span>{platform.name}</span>
                            </div>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400">
                    O produto já está disponível para visualização em seu cardápio digital e será exibido nas plataformas selecionadas.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => window.location.reload()} className="bg-pink-600 hover:bg-pink-700">
                  Adicionar Outro Produto
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Promoções */}
        <TabsContent value="promocoes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Promoções</CardTitle>
                  <CardDescription>
                    Gerencie suas promoções e ofertas especiais
                  </CardDescription>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Cake className="h-4 w-4 mr-2" />
                  Nova Promoção
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Promoções Ativas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promotions.filter(promo => promo.status === "active").map((promotion) => (
                    <Card key={promotion.id}>
                      <div className="relative">
                        <img 
                          src={promotion.image} 
                          alt={promotion.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          Ativa
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium">{promotion.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {promotion.description}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Início: {formatDate(promotion.startDate)}</span>
                          <span>Término: {formatDate(promotion.endDate)}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {promotion.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Encerrar</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-lg font-medium">Promoções Agendadas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promotions.filter(promo => promo.status === "scheduled").map((promotion) => (
                    <Card key={promotion.id}>
                      <div className="relative">
                        <img 
                          src={promotion.image} 
                          alt={promotion.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-blue-600">
                          Agendada
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium">{promotion.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {promotion.description}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Início: {formatDate(promotion.startDate)}</span>
                          <span>Término: {formatDate(promotion.endDate)}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {promotion.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Cancelar</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-lg font-medium">Promoções Encerradas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promotions.filter(promo => promo.status === "ended").map((promotion) => (
                    <Card key={promotion.id} className="opacity-75">
                      <div className="relative">
                        <img 
                          src={promotion.image} 
                          alt={promotion.title}
                          className="w-full h-32 object-cover rounded-t-lg grayscale"
                        />
                        <Badge className="absolute top-2 right-2 bg-gray-600">
                          Encerrada
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium">{promotion.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {promotion.description}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Início: {formatDate(promotion.startDate)}</span>
                          <span>Término: {formatDate(promotion.endDate)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Reativar</Button>
                        <Button variant="ghost" size="sm">Relatório</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pedidos */}
        <TabsContent value="pedidos">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Pedidos</CardTitle>
              <CardDescription>
                Acompanhe e gerencie os pedidos recebidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Pedidos Pendentes</h3>
                </div>
                
                <div className="space-y-4">
                  {orders.filter(order => order.status === "pending").map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Pedido #{order.id}</CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Cliente: {order.customer}
                            </p>
                          </div>
                          <Badge className="bg-yellow-600">Pendente</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <p className="font-medium mb-1">Itens:</p>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span>R$ {item.price} un.</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.date} às {order.time}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.deliveryMethod}
                              </p>
                            </div>
                            <p className="font-medium">Total: R$ {order.total}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Recusar</Button>
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Confirmar</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-lg font-medium">Pedidos Confirmados</h3>
                </div>
                
                <div className="space-y-4">
                  {orders.filter(order => order.status === "confirmed").map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Pedido #{order.id}</CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Cliente: {order.customer}
                            </p>
                          </div>
                          <Badge className="bg-green-600">Confirmado</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <p className="font-medium mb-1">Itens:</p>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span>R$ {item.price} un.</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.date} às {order.time}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.deliveryMethod}
                              </p>
                            </div>
                            <p className="font-medium">Total: R$ {order.total}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Concluir</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-lg font-medium">Pedidos Agendados</h3>
                </div>
                
                <div className="space-y-4">
                  {orders.filter(order => order.status === "scheduled").map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Pedido #{order.id}</CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Cliente: {order.customer}
                            </p>
                          </div>
                          <Badge className="bg-blue-600">Agendado</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <p className="font-medium mb-1">Itens:</p>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span>R$ {item.price} un.</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.date} às {order.time}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.deliveryMethod}
                              </p>
                            </div>
                            <p className="font-medium">Total: R$ {order.total}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        <Button variant="outline" size="sm">Enviar Lembrete</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para visualização de produto */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                Detalhes do produto
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="space-y-2">
                <Label>Descrição</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedProduct.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <div>
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Preço</Label>
                  <div>
                    {selectedProduct.isPromotion ? (
                      <div className="flex items-center gap-2">
                        <span className="line-through text-gray-500">R$ {selectedProduct.price}</span>
                        <span className="font-medium text-pink-600">R$ {selectedProduct.promotionPrice}</span>
                      </div>
                    ) : (
                      <span className="font-medium">R$ {selectedProduct.price}</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div>
                    {selectedProduct.isAvailable ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                        Disponível
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        Indisponível
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline">Editar</Button>
              <Button variant="default" className="bg-pink-600 hover:bg-pink-700">
                {selectedProduct.isAvailable ? "Marcar como Indisponível" : "Marcar como Disponível"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PostagemSnackShop;

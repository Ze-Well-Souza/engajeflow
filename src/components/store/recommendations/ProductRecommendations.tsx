
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  score: number;
}

interface ProductRecommendationsProps {
  userId?: string;
  clientId?: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ userId, clientId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("comportamento");

  useEffect(() => {
    loadRecommendations();
  }, [userId, clientId, activeTab]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    
    try {
      // Simulação de uma chamada à API de recomendações
      // Em um ambiente real, seria uma edge function do Supabase
      setTimeout(() => {
        const mockProducts: Product[] = [
          {
            id: "prod-1",
            name: "Plano Premium Trimestral",
            price: 99.90,
            image: "https://via.placeholder.com/150",
            category: "planos",
            score: 0.95
          },
          {
            id: "prod-2", 
            name: "Pacote de Créditos para Análise de Sentimento",
            price: 49.90,
            image: "https://via.placeholder.com/150",
            category: "serviços",
            score: 0.87
          },
          {
            id: "prod-3",
            name: "Template de Email Marketing",
            price: 19.90,
            image: "https://via.placeholder.com/150",
            category: "templates",
            score: 0.82
          },
          {
            id: "prod-4",
            name: "Curso de Estratégias de Conteúdo",
            price: 149.90,
            image: "https://via.placeholder.com/150",
            category: "cursos",
            score: 0.78
          }
        ];

        // Ordenar produtos com base no tipo de recomendação
        const sortedProducts = [...mockProducts].sort((a, b) => {
          if (activeTab === "comportamento") {
            return b.score - a.score;
          } else if (activeTab === "tendencias") {
            // Simulando diferentes critérios de ordenação com base em tendências
            return (b.score * Math.random()) - (a.score * Math.random());
          } else {
            return Math.random() - 0.5; // Para recomendações similares
          }
        });

        setRecommendedProducts(sortedProducts);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao carregar recomendações:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recomendações de Produtos</CardTitle>
        <Button variant="ghost" size="sm" onClick={loadRecommendations} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="comportamento">Baseado em Comportamento</TabsTrigger>
            <TabsTrigger value="tendencias">Tendências</TabsTrigger>
            <TabsTrigger value="similares">Produtos Similares</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-20 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </div>
              </Card>
            ))
          ) : recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge variant={activeTab === "tendencias" ? "destructive" : "secondary"}>
                      {activeTab === "tendencias" ? "Em alta" : 
                       activeTab === "comportamento" ? "Recomendado" : 
                       "Similar"}
                    </Badge>
                  </div>
                  <div className="h-20 bg-muted rounded mb-2 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">R$ {product.price.toFixed(2)}</span>
                    <Button size="sm">
                      Detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {activeTab === "comportamento" && `Relevância: ${(product.score * 100).toFixed(0)}%`}
                    {activeTab === "tendencias" && `Popularidade: ${(product.score * 100).toFixed(0)}%`}
                    {activeTab === "similares" && `Compatibilidade: ${(product.score * 100).toFixed(0)}%`}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              Nenhuma recomendação disponível no momento.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendations;

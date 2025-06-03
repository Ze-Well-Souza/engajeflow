
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/contexts/LocalizationContext";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from "recharts";
import { Search, ShoppingBag, Users, TrendingUp, Layers, Sparkles, ChevronRight, Tag, Clock } from "lucide-react";

const ProductRecommendationsPage = () => {
  const { formatCurrency } = useLocalization();
  
  const products = [
    {
      id: "1",
      name: "Smartphone Premium XS",
      description: "O mais avançado smartphone com câmera de alta resolução e bateria de longa duração.",
      price: 2499.90,
      imageUrl: "https://placehold.co/300x200/333/FFF?text=Smartphone",
      category: "Eletrônicos",
      recommendations: 245
    },
    // Mais produtos aqui
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Recomendações de Produtos</h1>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Produtos Recomendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">↑ 15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        {/* Mais cards aqui */}
      </div>
      
      {/* Tabs de produtos */}
      {/* Gráficos e análises */}
    </div>
  );
};

// Componente de card de produto (pode ser definido aqui ou em um arquivo separado)
const ProductCard = ({ product }) => {
  const { formatCurrency } = useLocalization();
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {product.recommendations} recomendações
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <div className="font-bold text-primary">{formatCurrency(product.price)}</div>
        </div>
        {/* Mais conteúdo do card */}
      </CardContent>
    </Card>
  );
};

export default ProductRecommendationsPage;

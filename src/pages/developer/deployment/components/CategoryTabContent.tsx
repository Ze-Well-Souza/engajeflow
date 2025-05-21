
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square, AlertTriangle, CheckCircle2, FileText, ShieldAlert, BarChart, Clock } from "lucide-react";
import { toast } from "sonner";
import { ChecklistItem, ChecklistItemCategory } from '../types';
import { getCategoryIcon, getCategoryTitle, calculateProgress } from '../utils';

interface CategoryTabContentProps {
  category: ChecklistItemCategory;
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
}

const CategoryTabContent: React.FC<CategoryTabContentProps> = ({ category, items, onToggleItem }) => {
  const getProgress = () => {
    return calculateProgress(items);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              {getCategoryIcon(category)}
              {getCategoryTitle(category)}
            </CardTitle>
            <Badge variant={getProgress() === 100 ? "default" : "secondary"}>
              {getProgress()}% concluído
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start p-3 rounded-lg border ${
                item.completed ? 'bg-green-500/10 border-green-500/20' : 'bg-card border-gray-700'
              }`}
            >
              <div 
                className="cursor-pointer"
                onClick={() => onToggleItem(item.id)}
              >
                {item.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-500" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium ${item.completed ? 'line-through text-green-400' : ''}`}>
                    {item.title}
                  </h4>
                  <Badge variant={
                    item.priority === 'high' ? "destructive" : 
                    item.priority === 'medium' ? "secondary" : 
                    "outline"
                  } className="text-xs">
                    {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {category === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recursos de Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando verificação de segurança...")}>
                <ShieldAlert className="mr-2 h-4 w-4" />
                Executar Verificação
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Gerando relatório LGPD...")}>
                <FileText className="mr-2 h-4 w-4" />
                Relatório LGPD
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Analisando tokens ativos...")}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Auditoria de Tokens
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Executando testes de intrusão...")}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Iniciar Pentest
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {category === 'performance' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Ferramentas de Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Iniciando teste de carga...")}>
                <BarChart className="mr-2 h-4 w-4" />
                Teste de Carga
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => toast.info("Analisando tempos de resposta...")}>
                <Clock className="mr-2 h-4 w-4" />
                Análise de Resposta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryTabContent;

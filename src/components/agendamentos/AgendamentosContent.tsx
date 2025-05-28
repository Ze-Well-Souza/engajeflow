
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, BarChart3, Settings } from 'lucide-react';
import NovoAgendamento from './NovoAgendamento';
import SmartHashtagSuggestions from '@/components/ai/SmartHashtagSuggestions';
import BestTimeToPost from '@/components/ai/BestTimeToPost';

const AgendamentosContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('novo');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agendamentos</h2>
          <p className="text-muted-foreground">
            Gerencie suas publicações agendadas com sugestões inteligentes de IA
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="novo">Novo Post</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags IA</TabsTrigger>
          <TabsTrigger value="horarios">Melhores Horários</TabsTrigger>
        </TabsList>

        <TabsContent value="novo" className="space-y-6">
          <NovoAgendamento />
        </TabsContent>

        <TabsContent value="calendario" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendário de Publicações
              </CardTitle>
              <CardDescription>
                Visualize e gerencie todas as suas publicações agendadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4 p-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="text-center font-medium p-2 border rounded">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="aspect-square border rounded p-2 text-sm">
                    {i + 1 <= 30 ? i + 1 : ''}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hashtags" className="space-y-6">
          <SmartHashtagSuggestions
            platform="instagram"
            content="Exemplo de conteúdo para análise"
            onHashtagsGenerated={(hashtags) => {
              console.log('Hashtags geradas:', hashtags);
            }}
          />
        </TabsContent>

        <TabsContent value="horarios" className="space-y-6">
          <BestTimeToPost
            platform="instagram"
            onTimeSelected={(time, day) => {
              console.log('Horário selecionado:', time, day);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgendamentosContent;

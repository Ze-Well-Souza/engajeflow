import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Play, Pause, Settings, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: Record<string, any>;
  actions: any[];
  conditions: Record<string, any>;
  is_active: boolean;
  execution_count: number;
  last_executed_at: string | null;
  created_at: string;
}

const SmartAutomations: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    triggerType: 'keyword',
    triggerConfig: {},
    actions: [],
    conditions: {},
    isActive: true
  });

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transformar dados do Supabase para o formato esperado
      const transformedData: Automation[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        trigger_type: item.trigger_type,
        trigger_config: typeof item.trigger_config === 'object' ? item.trigger_config as Record<string, any> : {},
        actions: Array.isArray(item.actions) ? item.actions : [],
        conditions: typeof item.conditions === 'object' ? item.conditions as Record<string, any> : {},
        is_active: item.is_active,
        execution_count: item.execution_count || 0,
        last_executed_at: item.last_executed_at,
        created_at: item.created_at
      }));
      
      setAutomations(transformedData);
    } catch (error) {
      console.error('Erro ao carregar automações:', error);
      toast.error('Erro ao carregar automações');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAutomation = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('Usuário não autenticado');

      const automationData = {
        user_id: user.data.user.id,
        name: formData.name,
        description: formData.description,
        trigger_type: formData.triggerType,
        trigger_config: formData.triggerConfig,
        actions: formData.actions,
        conditions: formData.conditions,
        is_active: formData.isActive
      };

      if (editingAutomation) {
        const { error } = await supabase
          .from('user_automations')
          .update(automationData)
          .eq('id', editingAutomation.id);
        
        if (error) throw error;
        toast.success('Automação atualizada com sucesso!');
      } else {
        const { error } = await supabase
          .from('user_automations')
          .insert(automationData);
        
        if (error) throw error;
        toast.success('Automação criada com sucesso!');
      }

      setShowForm(false);
      setEditingAutomation(null);
      setFormData({
        name: '',
        description: '',
        triggerType: 'keyword',
        triggerConfig: {},
        actions: [],
        conditions: {},
        isActive: true
      });
      
      loadAutomations();
    } catch (error) {
      console.error('Erro ao salvar automação:', error);
      toast.error('Erro ao salvar automação');
    }
  };

  const handleToggleActive = async (automationId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('user_automations')
        .update({ is_active: !isActive })
        .eq('id', automationId);

      if (error) throw error;
      
      toast.success(`Automação ${!isActive ? 'ativada' : 'desativada'}`);
      loadAutomations();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status da automação');
    }
  };

  const handleDeleteAutomation = async (automationId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta automação?')) return;

    try {
      const { error } = await supabase
        .from('user_automations')
        .delete()
        .eq('id', automationId);

      if (error) throw error;
      
      toast.success('Automação excluída');
      loadAutomations();
    } catch (error) {
      console.error('Erro ao excluir automação:', error);
      toast.error('Erro ao excluir automação');
    }
  };

  const triggerTypes = [
    { value: 'keyword', label: 'Palavra-chave', description: 'Executa quando uma palavra-chave é mencionada' },
    { value: 'schedule', label: 'Agendamento', description: 'Executa em horários específicos' },
    { value: 'mention', label: 'Menção', description: 'Executa quando você é mencionado' },
    { value: 'dm', label: 'Mensagem Direta', description: 'Executa quando recebe uma DM' },
    { value: 'follower', label: 'Novo Seguidor', description: 'Executa quando ganha um novo seguidor' }
  ];

  const actionTypes = [
    { value: 'reply', label: 'Responder', description: 'Envia uma resposta automática' },
    { value: 'post', label: 'Publicar', description: 'Cria um novo post' },
    { value: 'follow', label: 'Seguir', description: 'Segue automaticamente' },
    { value: 'like', label: 'Curtir', description: 'Curte automaticamente' },
    { value: 'notification', label: 'Notificação', description: 'Envia notificação' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando automações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automações Inteligentes</h2>
          <p className="text-muted-foreground">Configure automações para redes sociais e atendimento</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAutomation ? 'Editar' : 'Nova'} Automação</CardTitle>
            <CardDescription>
              Configure gatilhos e ações para automatizar suas redes sociais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="trigger">Gatilho</TabsTrigger>
                <TabsTrigger value="actions">Ações</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome da Automação</label>
                  <Input
                    placeholder="Ex: Resposta automática para menções"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Descrição</label>
                  <Textarea
                    placeholder="Descreva o que esta automação faz..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <label className="text-sm font-medium">Ativada</label>
                </div>
              </TabsContent>

              <TabsContent value="trigger" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Gatilho</label>
                  <Select
                    value={formData.triggerType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, triggerType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.triggerType === 'keyword' && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Palavras-chave</label>
                    <Input
                      placeholder="Ex: ajuda, suporte, preço (separadas por vírgula)"
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        triggerConfig: { keywords: e.target.value.split(',').map(k => k.trim()) }
                      }))}
                    />
                  </div>
                )}

                {formData.triggerType === 'schedule' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium mb-2 block">Agendamento</label>
                    <Input
                      type="time"
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        triggerConfig: { time: e.target.value }
                      }))}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ações a Executar</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma ação" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map(action => (
                        <SelectItem key={action.value} value={action.value}>
                          <div>
                            <div className="font-medium">{action.label}</div>
                            <div className="text-sm text-muted-foreground">{action.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Mensagem de Resposta</label>
                  <Textarea
                    placeholder="Digite a mensagem que será enviada automaticamente..."
                    rows={4}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveAutomation}>
                {editingAutomation ? 'Atualizar' : 'Criar'} Automação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{automation.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {automation.description}
                  </CardDescription>
                </div>
                <Badge variant={automation.is_active ? "default" : "secondary"}>
                  {automation.is_active ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <div><strong>Gatilho:</strong> {triggerTypes.find(t => t.value === automation.trigger_type)?.label}</div>
                <div><strong>Execuções:</strong> {automation.execution_count}</div>
                {automation.last_executed_at && (
                  <div><strong>Última execução:</strong> {new Date(automation.last_executed_at).toLocaleString()}</div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(automation.id, automation.is_active)}
                >
                  {automation.is_active ? (
                    <>
                      <Pause className="h-3 w-3 mr-1" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Ativar
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingAutomation(automation);
                    setFormData({
                      name: automation.name,
                      description: automation.description,
                      triggerType: automation.trigger_type,
                      triggerConfig: automation.trigger_config,
                      actions: automation.actions,
                      conditions: automation.conditions,
                      isActive: automation.is_active
                    });
                    setShowForm(true);
                  }}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Editar
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAutomation(automation.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {automations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhuma automação criada ainda. Clique em "Nova Automação" para começar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartAutomations;

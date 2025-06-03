import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Calendar,
  Globe,
  Bot,
  Activity,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { useAutomations, Automation, AutomationFilters } from '@/hooks/useAutomations';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AutomationPage: React.FC = () => {
  const {
    automations,
    executions,
    loading,
    creating,
    updating,
    deleting,
    fetchAutomations,
    createAutomation,
    updateAutomation,
    toggleAutomation,
    deleteAutomation,
    executeAutomation,
    duplicateAutomation,
    getAutomationStats,
  } = useAutomations();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<AutomationFilters>({});
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = getAutomationStats();

  // Filter automations based on search and filters
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = !searchTerm || 
      automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      automation.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || automation.status === filters.status;
    const matchesTrigger = !filters.trigger_type || automation.trigger_type === filters.trigger_type;
    const matchesActive = filters.is_active === undefined || automation.is_active === filters.is_active;

    return matchesSearch && matchesStatus && matchesTrigger && matchesActive;
  });

  // Status colors
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Trigger type icons and labels
  const getTriggerInfo = (triggerType: string) => {
    switch (triggerType) {
      case 'schedule':
        return { icon: Clock, label: 'Agendado', color: 'text-blue-600' };
      case 'event':
        return { icon: Zap, label: 'Evento', color: 'text-purple-600' };
      case 'webhook':
        return { icon: Globe, label: 'Webhook', color: 'text-green-600' };
      case 'manual':
        return { icon: Settings, label: 'Manual', color: 'text-gray-600' };
      case 'ai_suggestion':
        return { icon: Bot, label: 'IA', color: 'text-orange-600' };
      default:
        return { icon: Activity, label: 'Desconhecido', color: 'text-gray-600' };
    }
  };

  const handleCreateAutomation = async (formData: any) => {
    const result = await createAutomation(formData);
    if (result) {
      setShowCreateDialog(false);
    }
  };

  const handleToggleAutomation = async (id: string, isActive: boolean) => {
    await toggleAutomation(id, isActive);
  };

  const handleExecuteAutomation = async (id: string) => {
    await executeAutomation(id);
  };

  const handleDuplicateAutomation = async (id: string) => {
    await duplicateAutomation(id);
  };

  const handleDeleteAutomation = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta automação?')) {
      await deleteAutomation(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie workflows e automações para suas redes sociais
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          <Plus size={20} />
          Nova Automação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativas</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Com Erro</p>
                <p className="text-2xl font-bold text-red-600">{stats.withErrors}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar automações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select 
              value={filters.status || ''} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, status: value || undefined as any }))}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="paused">Pausadas</SelectItem>
                <SelectItem value="error">Com Erro</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.trigger_type || ''}
              onValueChange={(value) => setFilters(prev => ({ ...prev, trigger_type: value || undefined as any }))}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Gatilho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="schedule">Agendado</SelectItem>
                <SelectItem value="event">Evento</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="ai_suggestion">IA</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setFilters({});
              }}
              className="gap-2"
            >
              <Filter size={20} />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Automations List */}
      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">Carregando automações...</div>
            </CardContent>
          </Card>
        ) : filteredAutomations.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma automação encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || Object.keys(filters).length > 0
                    ? 'Nenhuma automação corresponde aos filtros aplicados.'
                    : 'Comece criando sua primeira automação.'
                  }
                </p>
                <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                  <Plus size={20} />
                  Criar Automação
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAutomations.map((automation) => {
            const triggerInfo = getTriggerInfo(automation.trigger_type);
            const TriggerIcon = triggerInfo.icon;

            return (
              <Card key={automation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${triggerInfo.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <TriggerIcon className={`h-5 w-5 ${triggerInfo.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {automation.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {automation.description || 'Sem descrição'}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getStatusColor(automation.status)}>
                            {automation.status === 'active' && 'Ativa'}
                            {automation.status === 'paused' && 'Pausada'}
                            {automation.status === 'error' && 'Erro'}
                            {automation.status === 'completed' && 'Concluída'}
                          </Badge>
                          
                          <Badge variant="outline">
                            {triggerInfo.label}
                          </Badge>
                          
                          <span className="text-xs text-gray-500">
                            Criado {formatDistanceToNow(new Date(automation.created_at), { 
                              addSuffix: true, 
                              locale: ptBR 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAutomation(automation.id, !automation.is_active)}
                        disabled={updating}
                        className="gap-2"
                      >
                        {automation.is_active ? (
                          <>
                            <Pause size={16} />
                            Pausar
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            Ativar
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExecuteAutomation(automation.id)}
                        className="gap-2"
                      >
                        <Play size={16} />
                        Executar
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedAutomation(automation)}>
                            <Edit size={16} className="mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateAutomation(automation.id)}>
                            <Copy size={16} className="mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteAutomation(automation.id)}
                            className="text-red-600"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Create Automation Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Automação</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              Funcionalidade de criação de automações será implementada na próxima fase.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancelar
              </Button>
              <Button disabled>
                Criar Automação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutomationPage; 

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, 
  Settings, 
  Shield, 
  Plus, 
  Edit2, 
  Trash2,
  UserPlus,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  Zap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive';
  permissions: string[];
  createdAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: 'automation' | 'analytics' | 'social' | 'ai' | 'ecommerce';
  enabled: boolean;
  requiredRole: 'admin' | 'user' | 'moderator';
}

const AdminConfigPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@empresa.com',
      role: 'user',
      status: 'active',
      permissions: ['social_media', 'analytics'],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@empresa.com',
      role: 'moderator',
      status: 'active',
      permissions: ['social_media', 'analytics', 'automation'],
      createdAt: '2024-01-20'
    }
  ]);

  const [services, setServices] = useState<Service[]>([
    {
      id: 'whatsapp_automation',
      name: 'Automação WhatsApp',
      description: 'Automação de mensagens e respostas no WhatsApp',
      category: 'automation',
      enabled: true,
      requiredRole: 'user'
    },
    {
      id: 'social_media_posting',
      name: 'Postagem em Redes Sociais',
      description: 'Agendamento e publicação automática de posts',
      category: 'social',
      enabled: true,
      requiredRole: 'user'
    },
    {
      id: 'advanced_analytics',
      name: 'Analytics Avançado',
      description: 'Relatórios detalhados e insights de performance',
      category: 'analytics',
      enabled: true,
      requiredRole: 'moderator'
    },
    {
      id: 'ai_content_generation',
      name: 'Geração de Conteúdo IA',
      description: 'Criação automática de posts e legendas com IA',
      category: 'ai',
      enabled: false,
      requiredRole: 'user'
    },
    {
      id: 'marketplace_integration',
      name: 'Integração Marketplace',
      description: 'Venda de produtos integrada ao sistema',
      category: 'ecommerce',
      enabled: true,
      requiredRole: 'admin'
    }
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as const,
    permissions: [] as string[]
  });

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      permissions: newUser.permissions,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'user', permissions: [] });
    setIsAddUserOpen(false);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const toggleService = (serviceId: string) => {
    setServices(services.map(service =>
      service.id === serviceId
        ? { ...service, enabled: !service.enabled }
        : service
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return <Zap className="h-4 w-4" />;
      case 'analytics': return <Settings className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'ai': return <Shield className="h-4 w-4" />;
      case 'ecommerce': return <ShoppingCart className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'bg-yellow-600';
      case 'analytics': return 'bg-blue-600';
      case 'social': return 'bg-green-600';
      case 'ai': return 'bg-purple-600';
      case 'ecommerce': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const availablePermissions = [
    'social_media',
    'analytics', 
    'automation',
    'ai_tools',
    'ecommerce',
    'admin_panel'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-orange-500" />
            Configurações Admin
          </h1>
          <p className="text-muted-foreground">
            Gerencie usuários, permissões e serviços do sistema
          </p>
        </div>
      </div>

      {/* Users Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gerenciamento de Usuários
            </CardTitle>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                  <DialogDescription>
                    Configure o acesso e permissões para o novo usuário
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Função</Label>
                    <Select value={newUser.role} onValueChange={(value: any) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="moderator">Moderador</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Permissões</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availablePermissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={permission}
                            checked={newUser.permissions.includes(permission)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewUser({
                                  ...newUser,
                                  permissions: [...newUser.permissions, permission]
                                });
                              } else {
                                setNewUser({
                                  ...newUser,
                                  permissions: newUser.permissions.filter(p => p !== permission)
                                });
                              }
                            }}
                          />
                          <Label htmlFor={permission} className="text-sm">
                            {permission.replace('_', ' ').toUpperCase()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddUser}>Adicionar Usuário</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex gap-1 mt-1">
                      {user.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'active' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gerenciamento de Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getCategoryColor(service.category)}/20`}>
                    <div className={`${getCategoryColor(service.category).replace('bg-', 'text-')}`}>
                      {getCategoryIcon(service.category)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{service.category}</Badge>
                      <Badge variant="secondary">Min: {service.requiredRole}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={service.enabled ? 'default' : 'secondary'}>
                    {service.enabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Switch
                    checked={service.enabled}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Integração com Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Funcionalidade de Marketplace</h4>
              <p className="text-sm text-blue-800 mb-3">
                A integração com marketplace permite que os usuários vendam produtos diretamente pelo sistema, 
                sem precisar sair da plataforma. Esta funcionalidade pode ser implementada como:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-green-700 mb-1">✅ Integração Nativa</h5>
                  <p className="text-xs text-gray-600">
                    Sistema de vendas completo integrado ao dashboard principal
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-orange-700 mb-1">🔌 Sistema de Plugins</h5>
                  <p className="text-xs text-gray-600">
                    Módulos independentes que podem ser ativados/desativados conforme necessário
                  </p>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Recomendação:</strong> Para máxima flexibilidade, sugerimos implementar como um sistema 
              de plugins modulares que podem ser habilitados conforme o plano do cliente.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminConfigPage;

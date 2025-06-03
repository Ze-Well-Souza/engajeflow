
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Settings, 
  Check, 
  X,
  MessageSquare,
  Heart,
  Share2,
  UserPlus,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const NotificacoesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  // Mock data para demonstração
  const notifications = [
    {
      id: '1',
      type: 'engagement',
      title: 'Nova curtida no seu post',
      description: 'Ana Silva curtiu sua publicação "Dicas de Marketing Digital"',
      timestamp: '2 minutos atrás',
      isRead: false,
      priority: 'normal',
      avatar: '/placeholder.svg',
      action: 'like',
      platform: 'Instagram'
    },
    {
      id: '2',
      type: 'message',
      title: 'Nova mensagem recebida',
      description: 'João Santos: "Gostaria de agendar uma consulta"',
      timestamp: '5 minutos atrás',
      isRead: false,
      priority: 'high',
      avatar: '/placeholder.svg',
      action: 'message',
      platform: 'WhatsApp'
    },
    {
      id: '3',
      type: 'system',
      title: 'Post agendado publicado',
      description: 'Seu post "Promoção especial" foi publicado com sucesso',
      timestamp: '1 hora atrás',
      isRead: true,
      priority: 'normal',
      avatar: null,
      action: 'publish',
      platform: 'Facebook'
    },
    {
      id: '4',
      type: 'analytics',
      title: 'Meta de engajamento atingida',
      description: 'Parabéns! Você atingiu 95% da meta mensal de engajamento',
      timestamp: '2 horas atrás',
      isRead: false,
      priority: 'high',
      avatar: null,
      action: 'achievement',
      platform: 'Geral'
    },
    {
      id: '5',
      type: 'follow',
      title: 'Novo seguidor',
      description: 'Maria Oliveira começou a te seguir',
      timestamp: '3 horas atrás',
      isRead: true,
      priority: 'normal',
      avatar: '/placeholder.svg',
      action: 'follow',
      platform: 'Instagram'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Limite de API próximo',
      description: 'Você usou 85% do limite mensal da API do Instagram',
      timestamp: '1 dia atrás',
      isRead: false,
      priority: 'high',
      avatar: null,
      action: 'warning',
      platform: 'Sistema'
    }
  ];

  const getNotificationIcon = (type: string, action: string) => {
    switch (action) {
      case 'like': return <Heart className="h-4 w-4 text-red-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'follow': return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'publish': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'achievement': return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-600';
      case 'WhatsApp': return 'bg-green-600';
      case 'Facebook': return 'bg-blue-600';
      case 'Sistema': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'important') return notification.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantCount = notifications.filter(n => n.priority === 'high').length;

  const markAsRead = (id: string) => {
    // Implementar lógica para marcar como lida
    console.log('Marcar como lida:', id);
  };

  const markAllAsRead = () => {
    // Implementar lógica para marcar todas como lidas
    console.log('Marcar todas como lidas');
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notificações
          </h1>
          <p className="text-muted-foreground">
            Fique por dentro de tudo que acontece nas suas redes sociais
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Marcar Todas Lidas
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">notificações</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
            <Badge variant="destructive" className="h-5 px-2 text-xs">
              {unreadCount}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">pendentes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Importantes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{importantCount}</div>
            <p className="text-xs text-muted-foreground">alta prioridade</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">notificações</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todas ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Não Lidas ({unreadCount})
        </Button>
        <Button
          variant={filter === 'important' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('important')}
        >
          Importantes ({importantCount})
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.isRead ? 'bg-muted/20' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>
                          {notification.description.split(' ')[0].slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type, notification.action)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            className={`text-xs px-2 py-0 ${getPlatformColor(notification.platform)}`}
                          >
                            {notification.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma notificação encontrada</p>
              <p className="text-sm">Suas notificações aparecerão aqui</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificacoesPage;

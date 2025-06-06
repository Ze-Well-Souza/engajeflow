
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Calendar,
  Activity,
  Zap
} from 'lucide-react';
import { useRealTimeMessages } from '@/hooks/useRealTimeMessages';
import { useConnectedAccounts } from '@/hooks/useConnectedAccounts';
import { useAuth } from '@/contexts/AuthContext';

const RealDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { messages, unreadCount, loading: messagesLoading } = useRealTimeMessages();
  const { accounts, loading: accountsLoading } = useConnectedAccounts();

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  const connectedPlatforms = accounts.filter(acc => acc.isActive);
  const todayMessages = messages.filter(msg => {
    const today = new Date().toISOString().split('T')[0];
    return msg.createdAt.startsWith(today);
  });

  const stats = [
    {
      title: 'Mensagens Não Lidas',
      value: unreadCount,
      change: '+12%',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Contas Conectadas',
      value: connectedPlatforms.length,
      change: '+1',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Mensagens Hoje',
      value: todayMessages.length,
      change: '+18%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Automações Ativas',
      value: 0, // Por enquanto 0, será implementado na próxima etapa
      change: '0%',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Boas-vindas */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Olá, {currentUser.fullName || 'Usuário'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está o que está acontecendo com suas redes sociais hoje.
          </p>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
          Plano {currentUser.planType}
        </Badge>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} desde ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contas conectadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contas Conectadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {accountsLoading ? (
            <div>Carregando contas...</div>
          ) : connectedPlatforms.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {connectedPlatforms.map((account) => (
                <div key={account.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {account.platform.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{account.accountName}</p>
                    <p className="text-sm text-muted-foreground capitalize">{account.platform}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhuma conta conectada ainda
              </p>
              <p className="text-sm text-muted-foreground">
                Conecte suas redes sociais para começar a usar a automação
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mensagens recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mensagens Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messagesLoading ? (
            <div>Carregando mensagens...</div>
          ) : messages.length > 0 ? (
            <div className="space-y-3">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    message.status === 'unread' ? 'bg-orange-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{message.senderName}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {message.platform}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma mensagem ainda
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealDashboard;

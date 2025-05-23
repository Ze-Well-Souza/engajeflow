
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Plus, Trash2, RefreshCw } from 'lucide-react';
import { SocialAccount } from '@/types/salon';
import { toast } from 'sonner';

interface SocialAuthManagerProps {
  onAccountChange?: (accounts: SocialAccount[]) => void;
}

const SocialAuthManager: React.FC<SocialAuthManagerProps> = ({ onAccountChange }) => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setIsLoading(true);
    try {
      // Simular carregamento de contas conectadas
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAccounts: SocialAccount[] = [
        {
          id: '1',
          platform: 'instagram',
          username: '@salaoexemplo',
          accessToken: 'mock_token_1',
          isActive: true,
          profile_picture_url: 'https://via.placeholder.com/40'
        },
        {
          id: '2',
          platform: 'facebook',
          username: 'Salão Exemplo',
          accessToken: 'mock_token_2',
          isActive: true,
          profile_picture_url: 'https://via.placeholder.com/40'
        },
        {
          id: '3',
          platform: 'youtube',
          username: 'Salão Exemplo TV',
          accessToken: 'mock_token_3',
          isActive: false,
          profile_picture_url: 'https://via.placeholder.com/40'
        }
      ];
      
      setAccounts(mockAccounts);
      onAccountChange?.(mockAccounts);
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
      toast.error('Erro ao carregar contas conectadas');
    } finally {
      setIsLoading(false);
    }
  };

  const connectAccount = async (platform: string) => {
    setConnectingPlatform(platform);
    try {
      // Simular processo de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAccount: SocialAccount = {
        id: Math.random().toString(36).substr(2, 9),
        platform,
        username: `@${platform}_account`,
        accessToken: `mock_token_${Date.now()}`,
        isActive: true,
        profile_picture_url: 'https://via.placeholder.com/40'
      };
      
      setAccounts(prev => [...prev, newAccount]);
      toast.success(`Conta ${platform} conectada com sucesso!`);
      onAccountChange?.([...accounts, newAccount]);
    } catch (error) {
      console.error(`Erro ao conectar ${platform}:`, error);
      toast.error(`Erro ao conectar conta ${platform}`);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const disconnectAccount = async (accountId: string) => {
    try {
      // Simular processo de desconexão
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAccounts = accounts.filter(account => account.id !== accountId);
      setAccounts(updatedAccounts);
      toast.success('Conta desconectada com sucesso!');
      onAccountChange?.(updatedAccounts);
    } catch (error) {
      console.error('Erro ao desconectar conta:', error);
      toast.error('Erro ao desconectar conta');
    }
  };

  const toggleAccountStatus = async (accountId: string) => {
    try {
      const updatedAccounts = accounts.map(account => 
        account.id === accountId 
          ? { ...account, isActive: !account.isActive }
          : account
      );
      setAccounts(updatedAccounts);
      toast.success('Status da conta atualizado!');
      onAccountChange?.(updatedAccounts);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status da conta');
    }
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      instagram: 'bg-pink-500',
      facebook: 'bg-blue-600',
      youtube: 'bg-red-500',
      twitter: 'bg-blue-400',
      linkedin: 'bg-blue-700'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const availablePlatforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'twitter', name: 'Twitter', icon: '🐦' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' }
  ];

  const unconnectedPlatforms = availablePlatforms.filter(
    platform => !accounts.some(account => account.platform === platform.id)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Contas Conectadas
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadAccounts}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription>
            Gerencie suas contas de redes sociais conectadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Carregando contas...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    Nenhuma conta conectada. Conecte suas redes sociais para começar a publicar.
                  </AlertDescription>
                </Alert>
              ) : (
                accounts.map((account) => (
                  <div 
                    key={account.id} 
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full ${getPlatformColor(account.platform)} flex items-center justify-center text-white font-bold`}>
                        {account.platform.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium capitalize">{account.platform}</h3>
                        <p className="text-sm text-gray-600">{account.username}</p>
                      </div>
                      <Badge variant={account.isActive ? "default" : "secondary"}>
                        {account.isActive ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAccountStatus(account.id)}
                      >
                        {account.isActive ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => disconnectAccount(account.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {unconnectedPlatforms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conectar Nova Conta</CardTitle>
            <CardDescription>
              Adicione mais redes sociais para expandir seu alcance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {unconnectedPlatforms.map((platform) => (
                <Button
                  key={platform.id}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center space-y-2"
                  onClick={() => connectAccount(platform.id)}
                  disabled={connectingPlatform === platform.id}
                >
                  {connectingPlatform === platform.id ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="text-sm">{platform.name}</span>
                    </>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialAuthManager;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { SocialConnectorService } from '@/services/SocialConnectorService';
import { useConnectedAccounts } from '@/hooks/useConnectedAccounts';
import { toast } from 'sonner';

const EnhancedSocialConnector: React.FC = () => {
  const { accounts, loading, connectAccount } = useConnectedAccounts();
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Record<string, any>>({});

  const handleConnect = async (platform: string) => {
    setIsConnecting(platform);
    
    try {
      let result;
      
      switch (platform) {
        case 'instagram':
          result = await SocialConnectorService.connectInstagram(
            credentials.accessToken,
            credentials.accountId
          );
          break;
          
        case 'facebook':
          result = await SocialConnectorService.connectFacebook(
            credentials.accessToken,
            credentials.pageId
          );
          break;
          
        case 'whatsapp':
          result = await SocialConnectorService.connectWhatsApp(
            credentials.accessToken,
            credentials.phoneNumberId
          );
          break;
          
        case 'telegram':
          result = await SocialConnectorService.connectTelegram(
            credentials.botToken
          );
          break;
          
        default:
          throw new Error('Plataforma não suportada');
      }

      await connectAccount({
        platform: result.platform,
        accountName: result.account_name,
        accountUsername: result.account_username,
        platformUserId: result.platform_user_id,
        accountData: result.account_data,
        isActive: true
      });

      toast.success(`${platform} conectado com sucesso!`);
      setCredentials({});
      
    } catch (error) {
      console.error(`Erro ao conectar ${platform}:`, error);
      toast.error(error instanceof Error ? error.message : `Erro ao conectar ${platform}`);
    } finally {
      setIsConnecting(null);
    }
  };

  const updateCredential = (platform: string, key: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [`${platform}_${key}`]: value
    }));
  };

  const getCredential = (platform: string, key: string) => {
    return credentials[`${platform}_${key}`] || '';
  };

  const isAccountConnected = (platform: string) => {
    return accounts.some(acc => acc.platform === platform && acc.isActive);
  };

  const getConnectedAccount = (platform: string) => {
    return accounts.find(acc => acc.platform === platform && acc.isActive);
  };

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram Business',
      description: 'Conecte sua conta do Instagram Business para publicar posts e stories',
      icon: '📷',
      color: 'bg-pink-500',
      fields: [
        { key: 'accessToken', label: 'Access Token', type: 'password' },
        { key: 'accountId', label: 'Account ID', type: 'text' }
      ]
    },
    {
      id: 'facebook',
      name: 'Facebook Pages',
      description: 'Conecte suas páginas do Facebook para publicar e gerenciar conteúdo',
      icon: '📘',
      color: 'bg-blue-600',
      fields: [
        { key: 'accessToken', label: 'Page Access Token', type: 'password' },
        { key: 'pageId', label: 'Page ID', type: 'text' }
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Conecte o WhatsApp Business API para automação de mensagens',
      icon: '💚',
      color: 'bg-green-500',
      fields: [
        { key: 'accessToken', label: 'Access Token', type: 'password' },
        { key: 'phoneNumberId', label: 'Phone Number ID', type: 'text' }
      ]
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      description: 'Conecte um bot do Telegram para automação de mensagens',
      icon: '✈️',
      color: 'bg-blue-400',
      fields: [
        { key: 'botToken', label: 'Bot Token', type: 'password' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Carregando contas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => {
          const connected = isAccountConnected(platform.id);
          const account = getConnectedAccount(platform.id);
          
          return (
            <Card key={platform.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center text-white text-lg`}>
                    {platform.icon}
                  </div>
                  {connected ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Conectado
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <XCircle className="h-3 w-3 mr-1" />
                      Desconectado
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>
              
              {connected && account ? (
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">{account.accountName}</div>
                    {account.accountUsername && (
                      <div className="text-sm text-muted-foreground">@{account.accountUsername}</div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      Conectado em {new Date(account.connectedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <Tabs defaultValue="connect" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="connect">Conectar</TabsTrigger>
                      <TabsTrigger value="help">Ajuda</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="connect" className="space-y-3 mt-4">
                      {platform.fields.map((field) => (
                        <div key={field.key} className="space-y-1">
                          <Label className="text-xs">{field.label}</Label>
                          <Input
                            type={field.type}
                            placeholder={field.label}
                            value={getCredential(platform.id, field.key)}
                            onChange={(e) => updateCredential(platform.id, field.key, e.target.value)}
                            className="text-xs"
                          />
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnecting === platform.id || !platform.fields.every(f => getCredential(platform.id, f.key))}
                        className="w-full mt-3"
                        size="sm"
                      >
                        {isConnecting === platform.id ? (
                          <>
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          'Conectar'
                        )}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="help" className="mt-4">
                      <div className="text-xs space-y-2">
                        <div className="font-medium">Como obter credenciais:</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => window.open(`https://docs.${platform.id}.com/api`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Documentação da API
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Contas Conectadas</CardTitle>
            <CardDescription>
              Gerencie suas contas de redes sociais conectadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {platforms.find(p => p.id === account.platform)?.icon}
                    </div>
                    <div>
                      <div className="font-medium">{account.accountName}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {account.platform}
                        {account.accountUsername && ` • @${account.accountUsername}`}
                      </div>
                    </div>
                  </div>
                  <Badge variant={account.isActive ? "default" : "secondary"}>
                    {account.isActive ? 'Ativa' : 'Inativa'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Alert>
        <AlertDescription>
          <strong>Importante:</strong> As credenciais das APIs são armazenadas de forma segura e criptografada. 
          Certifique-se de usar tokens com as permissões mínimas necessárias para suas necessidades.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EnhancedSocialConnector;

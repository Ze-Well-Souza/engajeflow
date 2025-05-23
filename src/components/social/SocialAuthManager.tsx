
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Facebook, Instagram, Twitter, Youtube, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { SocialAccount, SocialAuthService } from "@/services/social/SocialAuthService";

interface SocialAuthManagerProps {
  clientId?: string;
  onAccountConnected?: (account: SocialAccount) => void;
}

const SocialAuthManager: React.FC<SocialAuthManagerProps> = ({ clientId, onAccountConnected }) => {
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState("connected");
  
  useEffect(() => {
    // Simulação de contas conectadas
    setConnectedAccounts([
      {
        id: "1",
        platform: "instagram",
        username: "meu_negocio",
        displayName: "Meu Negócio",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        isConnected: true,
        lastSyncTime: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 horas atrás
      },
      {
        id: "2",
        platform: "facebook",
        username: "meu_negocio_oficial",
        displayName: "Meu Negócio Oficial",
        profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        isConnected: true,
        lastSyncTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      }
    ]);
  }, [clientId]);
  
  const handleConnect = async (platform: string) => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    
    try {
      // Simulação de conexão OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAccount: SocialAccount = {
        id: Math.random().toString(),
        platform,
        username: `minha_conta_${platform}`,
        displayName: platform === "instagram" ? "Minha Conta Instagram" : 
                    platform === "facebook" ? "Minha Página no Facebook" : 
                    platform === "twitter" ? "Minha Conta no Twitter" : 
                    "Meu Canal no YouTube",
        profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        isConnected: true,
        lastSyncTime: new Date(),
      };
      
      setConnectedAccounts(prev => [...prev, newAccount]);
      
      if (onAccountConnected) {
        onAccountConnected(newAccount);
      }
      
      toast.success(`Conta ${platform} conectada com sucesso!`);
      setActiveTab("connected");
    } catch (error) {
      console.error("Erro ao conectar conta:", error);
      toast.error(`Erro ao conectar conta ${platform}. Tente novamente.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [platform]: false }));
    }
  };
  
  const handleDisconnect = async (accountId: string) => {
    const account = connectedAccounts.find(acc => acc.id === accountId);
    if (!account) return;
    
    setIsLoading(prev => ({ ...prev, [accountId]: true }));
    
    try {
      // Simulação de desconexão
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId));
      toast.success(`Conta ${account.platform} desconectada com sucesso.`);
    } catch (error) {
      console.error("Erro ao desconectar conta:", error);
      toast.error(`Erro ao desconectar conta. Tente novamente.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [accountId]: false }));
    }
  };
  
  const handleRefreshToken = async (accountId: string) => {
    const account = connectedAccounts.find(acc => acc.id === accountId);
    if (!account) return;
    
    setIsLoading(prev => ({ ...prev, [accountId + "_refresh"]: true }));
    
    try {
      // Simulação de renovação de token
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedAccounts = connectedAccounts.map(acc => {
        if (acc.id === accountId) {
          return { ...acc, lastSyncTime: new Date() };
        }
        return acc;
      });
      
      setConnectedAccounts(updatedAccounts);
      toast.success(`Token da conta ${account.platform} renovado com sucesso.`);
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      toast.error(`Erro ao renovar token. Tente novamente.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [accountId + "_refresh"]: false }));
    }
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getConnectionStatus = (account: SocialAccount) => {
    if (!account.isConnected) {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          Desconectado
        </Badge>
      );
    }
    
    // Verificar se o token está próximo de expirar (simulação)
    const hoursSinceLastSync = (new Date().getTime() - account.lastSyncTime!.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastSync > 24) {
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          Reconectar
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        Conectado
      </Badge>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Contas Sociais</CardTitle>
        <CardDescription>
          Conecte suas redes sociais para gerenciamento centralizado
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="connected">
              Contas Conectadas
              {connectedAccounts.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {connectedAccounts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="connect">Conectar Nova Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connected" className="space-y-4">
            {connectedAccounts.length === 0 ? (
              <div className="text-center py-6">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium">Nenhuma conta conectada</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Conecte suas redes sociais para começar a gerenciar seu conteúdo
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveTab("connect")}
                >
                  Conectar Conta
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {account.profilePictureUrl ? (
                          <img
                            src={account.profilePictureUrl}
                            alt={account.displayName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getPlatformIcon(account.platform)
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{account.displayName}</h3>
                          {getPlatformIcon(account.platform)}
                        </div>
                        <p className="text-sm text-gray-500">@{account.username}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getConnectionStatus(account)}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleRefreshToken(account.id)}
                        disabled={isLoading[account.id + "_refresh"]}
                      >
                        <RefreshCw className="h-4 w-4" />
                        {isLoading[account.id + "_refresh"] ? "Renovando..." : "Renovar"}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDisconnect(account.id)}
                        disabled={isLoading[account.id]}
                      >
                        {isLoading[account.id] ? "Processando..." : "Desconectar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="connect" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['instagram', 'facebook', 'twitter', 'youtube'].map((platform) => {
                const isConnected = connectedAccounts.some(acc => acc.platform === platform);
                
                return (
                  <Card key={platform} className={`overflow-hidden ${isConnected ? 'border-green-500/50' : ''}`}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          {getPlatformIcon(platform)}
                          <h3 className="font-medium capitalize">{platform}</h3>
                        </div>
                        
                        {isConnected && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle className="h-3 w-3 mr-1" /> Conectado
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        {!isConnected
                          ? `Conecte sua conta ${platform} para gerenciar publicações e análises.`
                          : `Sua conta ${platform} já está conectada e pronta para uso.`}
                      </p>
                      
                      <Button
                        className="w-full"
                        variant={isConnected ? "outline" : "default"}
                        disabled={isLoading[platform] || isConnected}
                        onClick={() => handleConnect(platform)}
                      >
                        {isLoading[platform]
                          ? "Conectando..."
                          : isConnected
                          ? "Já Conectado"
                          : `Conectar ${platform}`}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialAuthManager;

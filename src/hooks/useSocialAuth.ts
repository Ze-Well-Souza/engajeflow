
import { useState, useEffect, useCallback } from 'react';
import SocialAuthService, { SocialAccount } from '@/services/social/SocialAuthService';
import { toast } from 'sonner';

interface UseSocialAuthResult {
  accounts: SocialAccount[];
  isLoading: boolean;
  error: string | null;
  connectAccount: (platform: string) => Promise<void>;
  disconnectAccount: (accountId: string) => Promise<void>;
  refreshToken: (accountId: string) => Promise<void>;
  isTokenExpired: (account: SocialAccount) => boolean;
  getAccountsByPlatform: (platform?: string) => SocialAccount[];
}

export const useSocialAuth = (): UseSocialAuthResult => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Função para carregar contas
  const loadAccounts = useCallback(async () => {
    try {
      const allAccounts = await SocialAuthService.getConnectedAccounts();
      setAccounts(allAccounts);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar contas:", err);
      setError("Falha ao carregar contas conectadas");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Carregar contas no mount
  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);
  
  // Verificar tokens expirados periodicamente
  useEffect(() => {
    const checkExpiredTokens = () => {
      accounts.forEach(account => {
        if (account.expiresAt && new Date(account.expiresAt) < new Date()) {
          toast.warning(`O token da conta ${account.platform} expirou. Renove para continuar usando.`);
        }
      });
    };
    
    const intervalId = setInterval(checkExpiredTokens, 60 * 60 * 1000); // Verificar a cada hora
    
    return () => clearInterval(intervalId);
  }, [accounts]);
  
  // Conectar nova conta
  const connectAccount = async (platform: string) => {
    setIsLoading(true);
    try {
      // Obter URL de autorização
      const authUrl = SocialAuthService.getAuthorizationUrl?.(platform) || '';
      
      // Simular o processo OAuth (em produção, isso redirecionaria para a URL de autenticação)
      console.log(`Em um ambiente de produção, o usuário seria redirecionado para: ${authUrl}`);
      
      // Simulando retorno do código de autorização após login bem-sucedido
      const mockCode = `mock_auth_code_${Date.now()}`;
      
      // Processar código de autorização
      const account = await SocialAuthService.handleAuthCallback?.(platform, mockCode) || await SocialAuthService.connectAccount(platform);
      
      setAccounts(prev => [...prev, account]);
      toast.success(`Conta ${platform} conectada com sucesso!`);
    } catch (err) {
      console.error("Erro ao conectar conta:", err);
      setError(`Falha ao conectar conta ${platform}`);
      toast.error(`Erro ao conectar conta ${platform}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Desconectar conta
  const disconnectAccount = async (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) {
      toast.error("Conta não encontrada");
      return;
    }
    
    setIsLoading(true);
    try {
      await SocialAuthService.disconnectAccount(accountId);
      setAccounts(prev => prev.filter(acc => acc.id !== accountId));
      toast.success(`Conta ${account.platform} desconectada com sucesso`);
    } catch (err) {
      console.error("Erro ao desconectar conta:", err);
      setError("Falha ao desconectar conta");
      toast.error("Erro ao desconectar conta");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Renovar token
  const refreshToken = async (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) {
      toast.error("Conta não encontrada");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await SocialAuthService.refreshToken(accountId);
      
      if (success) {
        // Recarregar contas para obter a atualizada
        await loadAccounts();
        toast.success(`Token da conta ${account.platform} renovado com sucesso`);
      } else {
        throw new Error("Falha ao renovar token");
      }
    } catch (err) {
      console.error("Erro ao renovar token:", err);
      setError("Falha ao renovar token");
      toast.error(`Erro ao renovar token da conta ${account.platform}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Verificar se token está expirado
  const isTokenExpired = (account: SocialAccount): boolean => {
    if (!account.expiresAt) return false;
    
    const expiryDate = new Date(account.expiresAt);
    return expiryDate < new Date();
  };
  
  // Obter contas por plataforma
  const getAccountsByPlatform = (platform?: string): SocialAccount[] => {
    return accounts.filter(acc => !platform || acc.platform === platform);
  };
  
  return {
    accounts,
    isLoading,
    error,
    connectAccount,
    disconnectAccount,
    refreshToken,
    isTokenExpired,
    getAccountsByPlatform
  };
};

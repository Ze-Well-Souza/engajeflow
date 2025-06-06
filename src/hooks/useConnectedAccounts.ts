
import { useEffect, useState } from 'react';
import { ConnectedAccountsService, ConnectedAccount } from '@/services/ConnectedAccountsService';
import { useAuth } from '@/contexts/AuthContext';

export const useConnectedAccounts = () => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const loadAccounts = async () => {
      try {
        const data = await ConnectedAccountsService.getConnectedAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Erro ao carregar contas conectadas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [currentUser]);

  const connectAccount = async (account: Omit<ConnectedAccount, 'id' | 'connectedAt'>) => {
    try {
      const newAccount = await ConnectedAccountsService.addConnectedAccount(account);
      setAccounts(prev => [newAccount, ...prev]);
      return newAccount;
    } catch (error) {
      console.error('Erro ao conectar conta:', error);
      throw error;
    }
  };

  const disconnectAccount = async (accountId: string) => {
    try {
      await ConnectedAccountsService.disconnectAccount(accountId);
      setAccounts(prev => prev.filter(acc => acc.id !== accountId));
    } catch (error) {
      console.error('Erro ao desconectar conta:', error);
      throw error;
    }
  };

  const isConnected = (platform: string): boolean => {
    return accounts.some(acc => acc.platform === platform && acc.isActive);
  };

  const getAccount = (platform: string): ConnectedAccount | undefined => {
    return accounts.find(acc => acc.platform === platform && acc.isActive);
  };

  return {
    accounts,
    loading,
    connectAccount,
    disconnectAccount,
    isConnected,
    getAccount,
  };
};

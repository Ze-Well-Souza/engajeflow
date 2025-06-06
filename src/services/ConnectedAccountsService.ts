
import { supabase } from '@/integrations/supabase/client';

export interface ConnectedAccount {
  id: string;
  platform: string;
  accountName: string;
  accountUsername?: string;
  platformUserId?: string;
  accountData: Record<string, any>;
  isActive: boolean;
  connectedAt: string;
  lastSyncAt?: string;
}

export class ConnectedAccountsService {
  // Obter contas conectadas do usuário
  static async getConnectedAccounts(): Promise<ConnectedAccount[]> {
    const { data, error } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('is_active', true)
      .order('connected_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(account => ({
      id: account.id,
      platform: account.platform,
      accountName: account.account_name,
      accountUsername: account.account_username,
      platformUserId: account.platform_user_id,
      accountData: account.account_data,
      isActive: account.is_active,
      connectedAt: account.connected_at,
      lastSyncAt: account.last_sync_at,
    }));
  }

  // Adicionar nova conta conectada
  static async addConnectedAccount(account: Omit<ConnectedAccount, 'id' | 'connectedAt'>) {
    const { data, error } = await supabase
      .from('connected_accounts')
      .insert({
        platform: account.platform,
        account_name: account.accountName,
        account_username: account.accountUsername,
        platform_user_id: account.platformUserId,
        account_data: account.accountData,
        is_active: account.isActive,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Desconectar conta
  static async disconnectAccount(accountId: string) {
    const { error } = await supabase
      .from('connected_accounts')
      .update({ is_active: false })
      .eq('id', accountId);
    
    if (error) throw error;
  }

  // Atualizar dados da conta
  static async updateAccountData(accountId: string, accountData: Record<string, any>) {
    const { error } = await supabase
      .from('connected_accounts')
      .update({ 
        account_data: accountData,
        last_sync_at: new Date().toISOString(),
      })
      .eq('id', accountId);
    
    if (error) throw error;
  }

  // Verificar se uma plataforma está conectada
  static async isPlatformConnected(platform: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('connected_accounts')
      .select('id')
      .eq('platform', platform)
      .eq('is_active', true)
      .limit(1);
    
    if (error) throw error;
    return data.length > 0;
  }
}

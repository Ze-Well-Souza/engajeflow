
/**
 * Serviço de autenticação para o TechCare Connect Automator
 */
import { toast } from "sonner";
import { getEnvVariable } from "../../utils/environment";

// Interfaces
interface AuthConfig {
  username?: string;
  password?: string;
  baseUrl?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * Serviço responsável pela autenticação no sistema TechCare
 */
class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private loginAttempts = 0;
  private readonly MAX_LOGIN_ATTEMPTS = 3;

  private constructor() {
    console.log('[AuthService] Inicializado');
  }

  /**
   * Obtém a instância singleton do serviço
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Realiza login no sistema
   */
  public async login(): Promise<AuthResponse> {
    try {
      // Obter credenciais das variáveis de ambiente
      const username = getEnvVariable('TECHCARE_USER');
      const password = getEnvVariable('TECHCARE_PASS');
      const baseUrl = getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com');
      
      if (!username || !password) {
        throw new Error("Credenciais não configuradas. Verifique as variáveis de ambiente TECHCARE_USER e TECHCARE_PASS.");
      }

      if (this.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
        throw new Error("Número máximo de tentativas de login excedido");
      }

      this.loginAttempts++;
      console.log(`[AuthService] Tentativa de login ${this.loginAttempts}/${this.MAX_LOGIN_ATTEMPTS}`);

      // Em produção, isto seria uma chamada real à API
      const response = await this.performLoginRequest(username, password, baseUrl);
      
      if (response.success && response.token) {
        this.token = response.token;
        this.loginAttempts = 0;
        console.log('[AuthService] Login realizado com sucesso');
        return { success: true, token: response.token };
      } else {
        console.error('[AuthService] Falha no login:', response.error);
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante login';
      console.error('[AuthService] Erro durante login:', errorMessage);
      toast.error(`Erro de autenticação: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Obtém o token de autenticação
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Realiza logout do sistema
   */
  public logout(): void {
    this.token = null;
    console.log('[AuthService] Logout realizado');
  }

  /**
   * Realiza uma requisição de login
   * Em produção, isto seria substituído por uma chamada real à API
   */
  private async performLoginRequest(username: string, password: string, baseUrl: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulação de API para fins de demonstração
        // Em produção, isso seria substituído por uma chamada HTTP real
        if (username && password) {
          resolve({ 
            success: true, 
            token: `auth-token-${Date.now()}` 
          });
        } else {
          resolve({ 
            success: false, 
            error: 'Credenciais inválidas' 
          });
        }
      }, 800);
    });
  }
}

export default AuthService.getInstance();

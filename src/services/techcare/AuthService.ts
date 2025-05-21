
/**
 * Serviço de autenticação para o TechCare Connect Automator
 */
import { toast } from "sonner";

// Interfaces
interface AuthConfig {
  username: string;
  password: string;
  baseUrl: string;
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
  private config: AuthConfig | null = null;
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
   * Configura o serviço de autenticação
   */
  public configure(config: AuthConfig): void {
    this.config = config;
    console.log('[AuthService] Configurado com sucesso');
  }

  /**
   * Realiza login no sistema
   */
  public async login(): Promise<AuthResponse> {
    try {
      if (!this.config) {
        throw new Error("Serviço não configurado");
      }

      if (this.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
        throw new Error("Número máximo de tentativas de login excedido");
      }

      this.loginAttempts++;
      console.log(`[AuthService] Tentativa de login ${this.loginAttempts}/${this.MAX_LOGIN_ATTEMPTS}`);

      // Simulação de login - em produção, isto seria uma chamada real à API
      const response = await this.simulateLoginRequest();
      
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
   * Simula uma requisição de login
   * Em produção, isto seria substituído por uma chamada real à API
   */
  private async simulateLoginRequest(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.config?.username === 'admin' && this.config?.password === 'password') {
          resolve({ 
            success: true, 
            token: `mock-token-${Date.now()}` 
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

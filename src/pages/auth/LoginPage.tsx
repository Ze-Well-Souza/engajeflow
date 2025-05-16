
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login(email, password);
      // O redirecionamento será feito pelo useEffect quando currentUser for atualizado
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.message?.includes("Invalid login credentials")) {
        setErrorMessage("Email ou senha inválidos. Por favor, verifique suas credenciais.");
      } else {
        setErrorMessage(error.message || "Falha no login. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">TechCare</CardTitle>
            <p className="text-center text-gray-400">Entre na sua conta para continuar</p>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="bg-destructive/20 text-destructive flex items-center gap-2 p-3 rounded-md mb-4">
                <AlertCircle size={16} />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Senha</label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-background"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Credenciais de teste para facilitar o acesso */}
        <div className="mt-4 p-4 bg-gray-800 rounded-md border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Credenciais de Teste:</h3>
          <div className="space-y-1">
            <p className="text-xs text-gray-400">Admin: admin@techcare.com / senha123</p>
            <p className="text-xs text-gray-400">Usuário: user@test.com / senha123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

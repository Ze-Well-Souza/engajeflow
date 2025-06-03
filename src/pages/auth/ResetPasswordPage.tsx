
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extrair o token da URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Link de recuperação inválido ou expirado");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    if (!token) {
      setErrorMessage("Token de recuperação não encontrado");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await updatePassword(password, token);
      toast.success("Senha atualizada com sucesso!");
      navigate("/login");
    } catch (error: any) {
      console.error("Erro na alteração de senha:", error);
      setErrorMessage(error.message || "Erro ao atualizar senha");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Redefinir Senha</CardTitle>
            <p className="text-center text-gray-400">Crie uma nova senha para sua conta</p>
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
                <label htmlFor="password" className="text-sm font-medium">Nova Senha</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || !token}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Senha</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || !token}
                  required
                  className="bg-background"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !token}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Alterando...
                  </>
                ) : (
                  "Redefinir Senha"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Lembrou sua senha?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Voltar para Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

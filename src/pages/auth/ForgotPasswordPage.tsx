
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast.success("Instruções de recuperação enviadas por email");
    } catch (error: any) {
      console.error("Erro no envio de recuperação:", error);
      setErrorMessage(error.message || "Erro ao enviar instruções de recuperação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">
              Recuperação de Senha
            </CardTitle>
            <p className="text-center text-gray-400">
              {isSubmitted 
                ? "Verifique seu email para instruções de recuperação" 
                : "Informe seu email para receber instruções"}
            </p>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="bg-destructive/20 text-destructive flex items-center gap-2 p-3 rounded-md mb-4">
                <AlertCircle size={16} />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            {!isSubmitted ? (
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Instruções"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-300 mb-4">
                  Se houver uma conta associada a este email, você receberá as instruções para recuperação.
                </p>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/login">Voltar para Login</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              Lembrou sua senha?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

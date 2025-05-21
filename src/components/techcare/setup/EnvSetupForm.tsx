
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { env, setEnv } from '@/utils/EnvironmentConfig';
import { AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

interface EnvSetupFormProps {
  onComplete: () => void;
}

const EnvSetupForm: React.FC<EnvSetupFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('https://app.techcare.com');
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se já existem variáveis configuradas
    const existingUsername = env.get('TECHCARE_USER');
    const existingPassword = env.get('TECHCARE_PASS');
    const existingBaseUrl = env.get('TECHCARE_BASE_URL');
    
    if (existingUsername) setUsername(existingUsername);
    if (existingPassword) setPassword(existingPassword);
    if (existingBaseUrl) setBaseUrl(existingBaseUrl);
    
    const validation = env.validateRequiredVariables();
    setIsValidated(validation.valid);
  }, []);

  const handleSave = () => {
    const newErrors: string[] = [];
    
    if (!username) newErrors.push('Username é obrigatório');
    if (!password) newErrors.push('Password é obrigatório');
    if (!baseUrl) newErrors.push('URL base é obrigatória');
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Salvar as variáveis
    setEnv('TECHCARE_USER', username);
    setEnv('TECHCARE_PASS', password);
    setEnv('TECHCARE_BASE_URL', baseUrl);
    
    toast({
      title: "Configuração salva",
      description: "Variáveis de ambiente configuradas com sucesso!",
    });
    
    setIsValidated(true);
    onComplete();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Configuração de Ambiente
        </CardTitle>
        <CardDescription>
          Configure as variáveis de ambiente necessárias para a conexão com o TechCare.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {import.meta.env.PROD && (
          <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Ambiente de produção</AlertTitle>
            <AlertDescription>
              Em ambiente de produção, as variáveis de ambiente devem ser configuradas através de variáveis de ambiente no Docker.
            </AlertDescription>
          </Alert>
        )}
        
        {isValidated && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Configuração válida</AlertTitle>
            <AlertDescription>
              Todas as variáveis de ambiente obrigatórias estão configuradas.
            </AlertDescription>
          </Alert>
        )}
        
        {errors.length > 0 && (
          <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erros de validação</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário do TechCare"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha do TechCare"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL Base</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="URL base do TechCare"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>
          Salvar Configuração
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnvSetupForm;

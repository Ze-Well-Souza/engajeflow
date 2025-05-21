
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { setEnvVariable, getEnvVariable } from '@/utils/environment';

interface EnvSetupFormProps {
  onComplete?: () => void;
}

const EnvSetupForm: React.FC<EnvSetupFormProps> = ({ onComplete }) => {
  const [username, setUsername] = useState(getEnvVariable('TECHCARE_USER', '') as string);
  const [password, setPassword] = useState(getEnvVariable('TECHCARE_PASS', '') as string);
  const [baseUrl, setBaseUrl] = useState(getEnvVariable('TECHCARE_BASE_URL', 'https://app.techcare.com') as string);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Salvar variáveis de ambiente
      setEnvVariable('TECHCARE_USER', username);
      setEnvVariable('TECHCARE_PASS', password);
      setEnvVariable('TECHCARE_BASE_URL', baseUrl);

      toast.success('Configurações salvas com sucesso');
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações');
      console.error('Erro ao salvar configurações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configuração do TechCare Connect</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Seu nome de usuário TechCare"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha TechCare"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL Base</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://app.techcare.com"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar configurações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnvSetupForm;

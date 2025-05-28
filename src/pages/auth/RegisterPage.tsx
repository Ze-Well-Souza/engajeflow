
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    segment: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !loading) {
      navigate('/', { replace: true });
    }
  }, [currentUser, loading, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/auth/login', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center">
            Registre-se para usar o TechCare Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome Completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="segment" className="text-sm font-medium">
                Segmento de Atuação
              </label>
              <Select 
                value={formData.segment} 
                onValueChange={(value) => handleInputChange('segment', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beauty">Beleza & Estética</SelectItem>
                  <SelectItem value="restaurant">Restaurante</SelectItem>
                  <SelectItem value="realestate">Imóveis</SelectItem>
                  <SelectItem value="retail">Varejo</SelectItem>
                  <SelectItem value="services">Serviços</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar Senha
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Faça login aqui
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { describe, it, expect, jest } from '@jest/globals';
import { useLocalization } from '@/contexts/LocalizationContext';

// Mock do useAuth hook
jest.mock('@/contexts/AuthContext', () => {
  const originalModule = jest.requireActual('@/contexts/AuthContext');
  return {
    ...originalModule,
    useAuth: jest.fn()
  };
});

// Mock do hook de navegação do React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('@/contexts/LocalizationContext', () => ({
  useLocalization: jest.fn(() => ({
    t: (key: string) => {
      const translations = {
        'auth.loginTitle': 'Login',
        'common.email': 'Email',
        'common.enterEmail': 'Insira seu email',
        'common.password': 'Senha',
        'common.forgotPassword': 'Esqueceu sua senha?',
        'common.login': 'Entrar',
        'common.loading': 'Entrando...',
        'common.dontHaveAccount': 'Não tem uma conta?',
        'common.register': 'Registre-se',
        'auth.invalidCredentials': 'Credenciais inválidas',
        'auth.loginError': 'Erro ao logar',
        'auth.testCredentials': 'Credenciais de teste',
        'auth.admin': 'Admin',
        'auth.user': 'Usuário'
      };
      return translations[key] || key;
    }
  }))
}));


describe('LoginPage', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      currentUser: null
    });
    (jest.requireActual('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocalization as jest.Mock).mockClear();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renderiza o formulário de login corretamente', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('TechCare')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Não tem uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Registre-se/i)).toBeInTheDocument();
  });
  
  it('permite inserir dados nos campos do formulário', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    
    expect(emailInput).toHaveValue('teste@exemplo.com');
    expect(passwordInput).toHaveValue('senha123');
  });
  
  it('chama a função login ao enviar o formulário', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('teste@exemplo.com', 'senha123');
    });
  });
  
  it('mostra mensagem de erro para credenciais inválidas', async () => {
    mockLogin.mockRejectedValue({ message: "Invalid login credentials" });
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument());
  });


  it('mostra mensagem de erro genérico caso ocorra um erro', async () => {
    mockLogin.mockRejectedValue(new Error("Generic error"));
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(screen.getByText('Erro ao logar')).toBeInTheDocument());
  });

  it('mostra o botão de loading durante o processo de login', async () => {
    // Simula uma requisição assíncrona sem setTimeout, utilizando uma Promise
    mockLogin.mockImplementation(() => new Promise(resolve => resolve(null)));
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => expect(screen.getByText('Entrando...')).toBeInTheDocument());
  });

  it('redireciona para a página inicial se o usuário já estiver logado', () => {
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin, currentUser: {uid: '123'} });
    render(<BrowserRouter><LoginPage /></BrowserRouter>);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
```
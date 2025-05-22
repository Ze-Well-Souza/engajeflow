
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Mock do useAuth hook
jest.mock('@/contexts/AuthContext', () => {
  const originalModule = jest.requireActual('@/contexts/AuthContext');
  return {
    ...originalModule,
    useAuth: jest.fn()
  };
});

// Mock do hook de navegação do React Router
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => jest.fn()
  };
});

describe('LoginPage', () => {
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      currentUser: null
    });
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
  
  it('mostra o botão de loading durante o processo de login', async () => {
    // Implementa uma versão mockada que atrasa a resolução para testar o estado de loading
    mockLogin.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(null), 100);
    }));
    
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
    
    expect(await screen.findByText('Entrando...')).toBeInTheDocument();
  });
});

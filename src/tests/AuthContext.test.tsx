
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Mock de supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: jest.fn().mockReturnValue({ 
        data: { subscription: { unsubscribe: jest.fn() } } 
      }),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn()
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null })
    })
  }
}));

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { currentUser, signIn, signOut, signUp } = useAuth();
  
  return (
    <div>
      <div data-testid="user-status">
        {currentUser ? 'Logado' : 'Deslogado'}
      </div>
      <button 
        data-testid="login-button" 
        onClick={() => signIn('test@example.com', 'password')}
      >
        Login
      </button>
      <button 
        data-testid="logout-button" 
        onClick={() => signOut()}
      >
        Logout
      </button>
      <button 
        data-testid="register-button" 
        onClick={() => signUp('test@example.com', 'password', 'Test User')}
      >
        Register
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('inicializa com usuário deslogado', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Deslogado');
    });
  });
  
  it('chama supabase.auth.signInWithPassword ao fazer login', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ data: {}, error: null });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('login-button'));
    
    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password'
      });
    });
  });
  
  it('chama supabase.auth.signOut ao fazer logout', async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('logout-button'));
    
    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
  
  it('chama supabase.auth.signUp ao fazer registro', async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({ data: {}, error: null });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('register-button'));
    
    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });
    });
  });
});

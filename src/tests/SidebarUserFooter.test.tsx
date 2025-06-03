```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarUserFooter from '../components/sidebar/SidebarUserFooter';
import { useAuth } from '@/contexts/AuthContext';
import { describe, it, expect, jest } from '@jest/globals';

// Mock do hook de autenticação
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock do hook de navegação do React Router
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

describe('SidebarUserFooter', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        name: 'John Doe',
        email: 'john@example.com',
        is_admin: true
      },
      logout: jest.fn() //não precisa de mockLogout, pois handleLogout foi removido do componente
    });
    (jest.requireActual('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renderiza o footer expandido corretamente com informações do usuário', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument(); //Melhora do seletor
  });
  
  it('renderiza o footer colapsado corretamente', () => {
    render(<SidebarUserFooter isCollapsed={true} />);
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument(); //Melhora do seletor
  });
  
  it('chama a função de navegação ao clicar no botão', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    
    const logoutButton = screen.getByRole('button', { name: /Sair/i }); //Melhora do seletor
    fireEvent.click(logoutButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  
  it('usa as iniciais do nome do usuário no Avatar', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
  
  it('usa o email quando o nome não está disponível', () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        email: 'john@example.com',
        is_admin: false
      },
      logout: jest.fn()
    });
    
    render(<SidebarUserFooter isCollapsed={false} />);
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Usuário')).toBeInTheDocument();
  });

  it('usa iniciais do email se o nome e email estiverem vazios', () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        is_admin: false
      },
      logout: jest.fn()
    });

    render(<SidebarUserFooter isCollapsed={false} />);
    expect(screen.getByText('TZ')).toBeInTheDocument();
  });

  it('renderiza o ícone de logout corretamente', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    expect(screen.getByRole('img', { name: /Sair/i })).toBeInTheDocument(); // Testando o ícone com getByRole
  });

});
```
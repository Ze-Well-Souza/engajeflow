
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarUserFooter from '../components/sidebar/SidebarUserFooter';
import { useAuth } from '@/contexts/AuthContext';

// Mock do hook de autenticação
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock do hook de navegação do React Router
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

describe('SidebarUserFooter', () => {
  const mockLogout = jest.fn();
  
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        name: 'John Doe',
        email: 'john@example.com',
        is_admin: true
      },
      logout: mockLogout
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renderiza o footer expandido corretamente com informações do usuário', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('renderiza o footer colapsado corretamente', () => {
    render(<SidebarUserFooter isCollapsed={true} />);
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('chama a função de logout ao clicar no botão', () => {
    render(<SidebarUserFooter isCollapsed={false} />);
    
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    
    expect(mockLogout).toHaveBeenCalled();
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
      logout: mockLogout
    });
    
    render(<SidebarUserFooter isCollapsed={false} />);
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Usuário')).toBeInTheDocument();
  });
});

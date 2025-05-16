
import React from 'react';
import { render, screen } from '@testing-library/react';
import LogsContent from '../../../components/admin/activity-logs/LogsContent';
import { ActivityLog } from '../../../components/admin/activity-logs/types';
import TestsWrapper from '../../../components/TestsWrapper';

// Mock dos dados de logs para testes
const mockLogs: ActivityLog[] = [
  {
    id: '1',
    user_email: 'admin@test.com',
    action: 'login',
    module: 'auth',
    timestamp: '2025-04-10T15:30:00Z',
    ip: '192.168.1.1',
    status: 'success',
    details: 'Login successful',
    metadata: {}
  },
  {
    id: '2',
    user_email: 'user@test.com',
    action: 'create',
    module: 'clients',
    timestamp: '2025-04-10T14:20:00Z',
    ip: '192.168.1.2',
    status: 'success',
    details: 'Created new client',
    metadata: {}
  }
];

describe('LogsContent', () => {
  it('renderiza a tabela de logs corretamente', () => {
    render(
      <TestsWrapper>
        <LogsContent 
          logs={mockLogs}
          isLoading={false}
          totalLogs={2}
          currentPage={1}
          pageSize={10}
          onPageChange={() => {}}
        />
      </TestsWrapper>
    );
    
    expect(screen.getByText('admin@test.com')).toBeInTheDocument();
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('create')).toBeInTheDocument();
  });
  
  it('mostra mensagem quando não há logs', () => {
    render(
      <TestsWrapper>
        <LogsContent 
          logs={[]}
          isLoading={false}
          totalLogs={0}
          currentPage={1}
          pageSize={10}
          onPageChange={() => {}}
        />
      </TestsWrapper>
    );
    
    expect(screen.getByText('Nenhum log encontrado')).toBeInTheDocument();
  });
  
  it('mostra indicador de carregamento', () => {
    render(
      <TestsWrapper>
        <LogsContent 
          logs={[]}
          isLoading={true}
          totalLogs={0}
          currentPage={1}
          pageSize={10}
          onPageChange={() => {}}
        />
      </TestsWrapper>
    );
    
    expect(screen.getByText('Carregando logs...')).toBeInTheDocument();
  });
  
  it('renderiza a paginação corretamente', () => {
    const mockLogsMany: ActivityLog[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${i+1}`,
      user_email: `user${i+1}@test.com`,
      action: 'view',
      module: 'dashboard',
      timestamp: '2025-04-10T15:30:00Z',
      ip: '192.168.1.1',
      status: 'success',
      details: 'Viewed dashboard',
      metadata: {}
    }));
    
    render(
      <TestsWrapper>
        <LogsContent 
          logs={mockLogsMany}
          isLoading={false}
          totalLogs={25}
          currentPage={1}
          pageSize={10}
          onPageChange={() => {}}
        />
      </TestsWrapper>
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

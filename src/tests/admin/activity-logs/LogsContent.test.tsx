
import React from 'react';
import { render, screen } from '@testing-library/react';
import LogsContent from '@/components/admin/activity-logs/LogsContent';
import { Table } from "@tanstack/react-table";

// Mock para as props do LogsContent
const mockLogsContentProps = {
  logs: [],
  currentItems: [],
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: jest.fn(),
  isLoading: false,
};

describe('LogsContent', () => {
  it('renderiza a mensagem de "Nenhum dado encontrado" quando não há dados', () => {
    render(<LogsContent {...mockLogsContentProps} />);
    expect(screen.getByText('Nenhum dado encontrado.')).toBeInTheDocument();
  });

  it('renderiza a tabela quando há dados', () => {
    const propsWithData = {
      ...mockLogsContentProps,
      currentItems: [
        { id: '1', userId: '1', action: 'login', timestamp: '2025-05-10T14:30:00Z', details: { ip: '192.168.1.1' } },
        { id: '2', userId: '2', action: 'update', timestamp: '2025-05-11T10:15:00Z', details: { resource: 'product' } },
      ],
    };

    render(<LogsContent {...propsWithData} />);
    expect(screen.queryByText('Nenhum dado encontrado.')).toBeNull();
  });

  it('renderiza a mensagem de carregamento quando isLoading é true', () => {
    render(<LogsContent {...{ ...mockLogsContentProps, isLoading: true }} />);
    expect(screen.getByText('Carregando logs...')).toBeInTheDocument();
  });
});

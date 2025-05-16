import React from 'react';
import { render, screen } from '@testing-library/react';
import LogsContent from '@/components/admin/activity-logs/LogsContent';
import { Table } from "@tanstack/react-table";

// Mock para a tabela
const mockTable = {
  getHeaderGroups: () => [],
  getRowModel: {
    rows: [],
  },
} as unknown as Table<any>;

// Mock para as props do LogsContent
const mockLogsContentProps = {
  table: mockTable,
  isLoading: false,
};

describe('LogsContent', () => {
  it('renderiza a mensagem de "Nenhum dado encontrado" quando não há dados', () => {
    render(<LogsContent {...mockLogsContentProps} />);
    expect(screen.getByText('Nenhum dado encontrado.')).toBeInTheDocument();
  });

  it('renderiza a tabela quando há dados', () => {
    const mockTableWithRows = {
      getHeaderGroups: () => [],
      getRowModel: {
        rows: [{ id: '1' }, { id: '2' }], // Adiciona algumas linhas mockadas
      },
    } as unknown as Table<any>;

    render(<LogsContent table={mockTableWithRows} isLoading={false} />);
    expect(screen.queryByText('Nenhum dado encontrado.')).toBeNull();
  });

  it('renderiza a mensagem de carregamento quando isLoading é true', () => {
    render(<LogsContent table={mockTable} isLoading={true} />);
    expect(screen.getByText('Carregando logs...')).toBeInTheDocument();
  });
});

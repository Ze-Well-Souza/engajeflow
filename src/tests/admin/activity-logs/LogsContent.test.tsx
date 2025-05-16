
import React from "react";
import { render, screen } from "@testing-library/react";
import LogsContent from "@/components/admin/activity-logs/LogsContent";
import { ActivityLog } from "@/types";

// Mock das dependências
jest.mock("@/components/admin/activity-logs/LogsTable", () => ({
  LogsTable: ({ data }: { data: ActivityLog[] }) => (
    <div data-testid="logs-table">{data.length} logs na tabela</div>
  ),
}));

jest.mock("@/components/admin/activity-logs/LogsPagination", () => ({
  __esModule: true,
  default: ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => (
    <div data-testid="logs-pagination">Página {currentPage} de {totalPages}</div>
  ),
}));

jest.mock("@/components/admin/activity-logs/EmptyLogs", () => ({
  __esModule: true,
  default: () => <div data-testid="empty-logs">Nenhum log encontrado</div>,
}));

describe("LogsContent Component", () => {
  const mockSetCurrentPage = jest.fn();
  
  const mockLogs: ActivityLog[] = [
    {
      id: "1",
      user_email: "user@example.com",
      action: "login",
      module: "auth",
      timestamp: new Date().toISOString(),
      ip: "127.0.0.1",
      status: "success",
      details: "Login bem-sucedido"
    }
  ];

  it("renders the logs table when logs are available", () => {
    render(
      <LogsContent 
        logs={mockLogs}
        currentItems={mockLogs}
        currentPage={1}
        totalPages={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    
    expect(screen.getByTestId("logs-table")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-logs")).not.toBeInTheDocument();
  });

  it("renders empty state when no logs are available", () => {
    render(
      <LogsContent 
        logs={[]}
        currentItems={[]}
        currentPage={1}
        totalPages={0}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    
    expect(screen.queryByTestId("logs-table")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-logs")).toBeInTheDocument();
  });

  it("shows pagination when there are more than 10 logs", () => {
    // Criar um array com 11 logs
    const manyLogs: ActivityLog[] = Array(11).fill(0).map((_, i) => ({
      id: `${i + 1}`,
      user_email: "user@example.com",
      action: "login",
      module: "auth",
      timestamp: new Date().toISOString(),
      ip: "127.0.0.1",
      status: "success",
      details: `Log ${i + 1}`
    }));
    
    render(
      <LogsContent 
        logs={manyLogs}
        currentItems={manyLogs.slice(0, 10)}
        currentPage={1}
        totalPages={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    
    expect(screen.getByTestId("logs-pagination")).toBeInTheDocument();
  });

  it("hides pagination when there are 10 or fewer logs", () => {
    render(
      <LogsContent 
        logs={mockLogs}
        currentItems={mockLogs}
        currentPage={1}
        totalPages={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    
    expect(screen.queryByTestId("logs-pagination")).not.toBeInTheDocument();
  });
});

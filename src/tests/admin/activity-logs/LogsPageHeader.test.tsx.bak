
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LogsPageHeader from "@/components/admin/activity-logs/LogsPageHeader";

describe("LogsPageHeader Component", () => {
  const mockRefresh = jest.fn();
  const mockExportOpen = jest.fn();
  
  it("renders the header title and description", () => {
    render(
      <LogsPageHeader 
        onRefresh={mockRefresh} 
        onExportOpen={mockExportOpen} 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText("Logs de Atividades")).toBeInTheDocument();
    expect(screen.getByText("Visualize todas as atividades realizadas pelos usuários no sistema")).toBeInTheDocument();
  });

  it("renders buttons with correct icons", () => {
    render(
      <LogsPageHeader 
        onRefresh={mockRefresh} 
        onExportOpen={mockExportOpen} 
        isLoading={false} 
      />
    );
    
    expect(screen.getByText("Atualizar")).toBeInTheDocument();
    expect(screen.getByText("Exportar")).toBeInTheDocument();
    
    // Verificar se os ícones estão presentes
    const svgElements = document.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThanOrEqual(2);
  });

  it("calls onRefresh when refresh button is clicked", () => {
    render(
      <LogsPageHeader 
        onRefresh={mockRefresh} 
        onExportOpen={mockExportOpen} 
        isLoading={false} 
      />
    );
    
    fireEvent.click(screen.getByText("Atualizar"));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("calls onExportOpen when export button is clicked", () => {
    render(
      <LogsPageHeader 
        onRefresh={mockRefresh} 
        onExportOpen={mockExportOpen} 
        isLoading={false} 
      />
    );
    
    fireEvent.click(screen.getByText("Exportar"));
    expect(mockExportOpen).toHaveBeenCalledTimes(1);
  });

  it("disables the refresh button when isLoading is true", () => {
    render(
      <LogsPageHeader 
        onRefresh={mockRefresh} 
        onExportOpen={mockExportOpen} 
        isLoading={true} 
      />
    );
    
    const refreshButton = screen.getByText("Atualizar").closest("button");
    expect(refreshButton).toBeDisabled();
  });
});

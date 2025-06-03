
import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyLogs from "@/components/admin/activity-logs/EmptyLogs";

describe("EmptyLogs Component", () => {
  it("renders the empty state message", () => {
    render(<EmptyLogs />);
    
    expect(screen.getByText("Nenhum log encontrado para os filtros selecionados.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<EmptyLogs />);
    
    // Verificar se o SVG está presente (implementação pode variar dependendo de como testar ícones)
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});

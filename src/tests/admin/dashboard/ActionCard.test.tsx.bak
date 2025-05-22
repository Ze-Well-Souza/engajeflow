
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ActionCard from "@/components/admin/dashboard/ActionCard";
import { UsersRound } from "lucide-react";

describe("ActionCard Component", () => {
  it("renders with all props correctly", () => {
    render(
      <BrowserRouter>
        <ActionCard
          title="Gerenciar Clientes"
          description="Descrição teste"
          icon={UsersRound}
          linkTo="/test-link"
        >
          Conteúdo de teste
        </ActionCard>
      </BrowserRouter>
    );

    expect(screen.getByText("Gerenciar Clientes")).toBeInTheDocument();
    expect(screen.getByText("Descrição teste")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo de teste")).toBeInTheDocument();
    expect(screen.getByText("Acessar")).toBeInTheDocument();
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-link");
  });
});

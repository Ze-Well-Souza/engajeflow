
import React from "react";
import { render, screen } from "@testing-library/react";
import ActionBadge from "@/components/admin/activity-logs/ActionBadge";

describe("ActionBadge Component", () => {
  it("renders delete action with destructive variant", () => {
    render(<ActionBadge action="delete" />);
    
    const badge = screen.getByText("delete");
    expect(badge).toBeInTheDocument();
    // Verifica a classe para variante destructive (implementação depende da classe real usada)
    expect(badge.className).toContain("destructive");
  });

  it("renders create action with default variant", () => {
    render(<ActionBadge action="create" />);
    
    const badge = screen.getByText("create");
    expect(badge).toBeInTheDocument();
    // Verifica que não tem classe destructive
    expect(badge.className).not.toContain("destructive");
  });

  it("renders login action with default variant", () => {
    render(<ActionBadge action="login" />);
    
    const badge = screen.getByText("login");
    expect(badge).toBeInTheDocument();
    // Verifica que não tem classe destructive
    expect(badge.className).not.toContain("destructive");
  });

  it("renders other actions with outline variant", () => {
    render(<ActionBadge action="update" />);
    
    const badge = screen.getByText("update");
    expect(badge).toBeInTheDocument();
    // Verifica a classe para variante outline (implementação depende da classe real usada)
    expect(badge.className).toContain("outline");
  });
});

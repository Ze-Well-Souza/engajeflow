
import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "@/components/admin/dashboard/StatCard";
import { UsersRound } from "lucide-react";

describe("StatCard Component", () => {
  it("renders with all props correctly", () => {
    render(
      <StatCard
        title="Total de Clientes"
        value={42}
        description="Descrição teste"
        icon={UsersRound}
        iconClassName="text-red-500"
      />
    );

    expect(screen.getByText("Total de Clientes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("Descrição teste")).toBeInTheDocument();
  });

  it("renders without description when not provided", () => {
    render(
      <StatCard
        title="Total de Clientes"
        value={42}
        icon={UsersRound}
      />
    );

    expect(screen.getByText("Total de Clientes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.queryByText("Descrição teste")).not.toBeInTheDocument();
  });

  it("renders string values correctly", () => {
    render(
      <StatCard
        title="Uso de API"
        value="87%"
        icon={UsersRound}
      />
    );

    expect(screen.getByText("Uso de API")).toBeInTheDocument();
    expect(screen.getByText("87%")).toBeInTheDocument();
  });
});

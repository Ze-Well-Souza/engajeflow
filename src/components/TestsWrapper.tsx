
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TestsWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

/**
 * Componente wrapper para exibição de testes e exemplos
 * Este componente demonstra a estrutura modular e reutilizável
 * que foi implementada em toda a aplicação após a refatoração
 */
const TestsWrapper: React.FC<TestsWrapperProps> = ({ 
  children,
  title,
  description
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default TestsWrapper;

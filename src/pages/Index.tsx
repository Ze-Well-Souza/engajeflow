
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const modules = [
    {
      title: "Dashboard",
      description: "Visualize estatísticas e métricas de desempenho",
      links: [
        { path: "/dashboard", label: "Dashboard Principal" }
      ]
    },
    {
      title: "Gateway",
      description: "Gerencie integrações e configurações do gateway",
      links: [
        { path: "/gateway", label: "Dashboard Gateway" },
        { path: "/gateway/integrations", label: "Integrações" }
      ]
    },
    {
      title: "Loja",
      description: "Gerenciamento de vendas e pagamentos",
      links: [
        { path: "/store/vendas", label: "Vendas" },
        { path: "/store/stripe", label: "Integração Stripe" },
        { path: "/store/payment", label: "Teste de Pagamento" }
      ]
    },
    {
      title: "Relatórios",
      description: "Análise de dados e relatórios",
      links: [
        { path: "/relatorios", label: "Relatórios Gerais" },
        { path: "/reports/social", label: "Redes Sociais" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">TechCare Connect</h1>
        <p className="text-muted-foreground">Plataforma de Gestão de Marketing e Vendas</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {module.links.map((link, linkIndex) => (
                  <Link key={linkIndex} to={link.path} className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={module.links[0].path} className="w-full">
                <Button className="w-full">Acessar {module.title}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TechCare Connect - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Index;

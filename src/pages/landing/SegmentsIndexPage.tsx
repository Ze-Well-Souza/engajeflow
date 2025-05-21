
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart, Video, Briefcase, BookOpen, Users, ScrollText } from "lucide-react";

interface SegmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ title, description, icon, path, color }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className={`h-2 ${color} w-full`}></div>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Soluções personalizadas para as necessidades específicas deste segmento.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={path} className="flex items-center justify-between">
            <span>Ver soluções</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const SegmentsIndexPage: React.FC = () => {
  const segments = [
    {
      title: "Lojistas online (e-commerce)",
      description: "Atendimento pós-venda, rastreamento de pedidos, suporte via chat",
      icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
      path: "/landing/ecommerce",
      color: "bg-blue-500"
    },
    {
      title: "Criadores de conteúdo",
      description: "Agendamento de mensagens, respostas automáticas para seguidores",
      icon: <Video className="h-5 w-5 text-purple-500" />,
      path: "/landing/content-creator",
      color: "bg-purple-500"
    },
    {
      title: "Freelancers",
      description: "Suporte a clientes, cobrança, lembretes",
      icon: <Briefcase className="h-5 w-5 text-teal-500" />,
      path: "/landing/freelancer",
      color: "bg-teal-500"
    },
    {
      title: "Educadores / cursos online",
      description: "Responder dúvidas, mandar materiais, organizar listas de alunos",
      icon: <BookOpen className="h-5 w-5 text-amber-500" />,
      path: "/landing/educator",
      color: "bg-amber-500"
    },
    {
      title: "Empresas de RH / recrutamento",
      description: "Agendamento de entrevistas, envio automático de feedback",
      icon: <Users className="h-5 w-5 text-red-500" />,
      path: "/landing/hr",
      color: "bg-red-500"
    },
    {
      title: "Contadores / advogados",
      description: "Atualizações de processos, envio de documentos, lembretes",
      icon: <ScrollText className="h-5 w-5 text-green-500" />,
      path: "/landing/professional",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Soluções por segmento
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          A TechCare Automation Platform oferece soluções personalizadas para diferentes segmentos de negócio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, index) => (
          <SegmentCard
            key={index}
            title={segment.title}
            description={segment.description}
            icon={segment.icon}
            path={segment.path}
            color={segment.color}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Não encontrou seu segmento?</h2>
        <p className="mt-2 text-muted-foreground">
          Entre em contato conosco para uma solução personalizada para o seu negócio.
        </p>
        <Button size="lg" className="mt-4">
          Solicitar consultoria personalizada
        </Button>
      </div>
    </div>
  );
};

export default SegmentsIndexPage;

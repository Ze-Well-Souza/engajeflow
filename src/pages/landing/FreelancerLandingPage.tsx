
import React from 'react';
import SegmentLandingPage from '@/components/landingpages/SegmentLandingPage';

const FreelancerLandingPage: React.FC = () => {
  const features = [
    {
      title: "Atendimento automatizado",
      description: "Responda perguntas frequentes de clientes mesmo quando estiver ocupado em projetos."
    },
    {
      title: "Sistema de cobrança",
      description: "Envie cobranças automaticamente e acompanhe pagamentos de forma organizada."
    },
    {
      title: "Lembretes inteligentes",
      description: "Receba notificações sobre prazos de projetos e pagamentos pendentes."
    },
    {
      title: "Captura de leads",
      description: "Transforme interessados em clientes com fluxos de comunicação personalizados."
    },
    {
      title: "Organização de projetos",
      description: "Mantenha toda a comunicação do cliente organizada por projeto para referência rápida."
    },
    {
      title: "Contratos automáticos",
      description: "Gere e envie contratos padronizados para novos clientes com apenas alguns cliques."
    }
  ];

  const testimonials = [
    {
      quote: "O TechCare mudou completamente minha forma de trabalhar. Agora consigo gerenciar mais projetos e clientes sem me sentir sobrecarregado.",
      author: "Ricardo Sousa",
      role: "Designer Gráfico",
      company: "Freelancer"
    },
    {
      quote: "O sistema de cobrança automática reduziu drasticamente meus atrasos de pagamento. Os clientes adoram a praticidade.",
      author: "Patrícia Lima",
      role: "Redatora",
      company: "Freelancer"
    },
    {
      quote: "Os lembretes inteligentes garantem que eu nunca perca um prazo. Minha reputação com os clientes melhorou significativamente.",
      author: "Fernando Gomes",
      role: "Desenvolvedor Web",
      company: "Freelancer"
    }
  ];

  return (
    <SegmentLandingPage 
      segment="Freelancers"
      headline="Ganhe tempo com automações e concentre-se no que realmente importa: criar."
      subheadline="Automatize comunicação com clientes, cobranças e lembretes para focar sua energia no desenvolvimento de projetos excepcionais."
      problem="Você perde tempo precioso respondendo a emails e mensagens repetitivas? Tem dificuldade para acompanhar pagamentos e prazos? Sente que poderia pegar mais projetos se tivesse uma forma eficiente de gerenciar os existentes?"
      solution="O TechCare oferece ferramentas específicas para freelancers automatizarem tarefas administrativas, desde o atendimento ao cliente até cobranças e lembretes de prazos, permitindo que você dedique mais horas ao seu verdadeiro trabalho."
      cta="Simplifique seu fluxo de trabalho"
      features={features}
      testimonials={testimonials}
      bgColor="bg-teal-600"
      accentColor="text-teal-600"
    />
  );
};

export default FreelancerLandingPage;

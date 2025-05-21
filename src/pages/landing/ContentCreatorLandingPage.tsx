
import React from 'react';
import SegmentLandingPage from '@/components/landingpages/SegmentLandingPage';

const ContentCreatorLandingPage: React.FC = () => {
  const features = [
    {
      title: "Agendamento de mensagens",
      description: "Programe suas respostas e postagens para serem enviadas no momento ideal para seu público."
    },
    {
      title: "Respostas automáticas",
      description: "Configure respostas para perguntas frequentes dos seus seguidores, deixando você livre para criar."
    },
    {
      title: "Gerenciamento de parcerias",
      description: "Organize e automatize sua comunicação com marcas e patrocinadores."
    },
    {
      title: "Análise de engajamento",
      description: "Obtenha insights valiosos sobre o desempenho de suas postagens e interações."
    },
    {
      title: "Geração de conteúdo com IA",
      description: "Nossa IA sugere ideias de conteúdo e captions personalizadas para suas postagens."
    },
    {
      title: "Gestão de múltiplos canais",
      description: "Administre todas as suas plataformas sociais em um único lugar."
    }
  ];

  const testimonials = [
    {
      quote: "Finalmente posso me concentrar na criação de conteúdo enquanto o TechCare administra todas as minhas mensagens e interações.",
      author: "Julia Mendes",
      role: "Influenciadora",
      company: "450k seguidores"
    },
    {
      quote: "O agendamento de conteúdo e mensagens me permitiu ter uma presença consistente nas redes sociais, mesmo quando estou offline.",
      author: "Bruno Alves",
      role: "YouTuber",
      company: "TechReviews"
    },
    {
      quote: "As sugestões de conteúdo da IA ajudaram a aumentar meu engajamento em 40%. Estou impressionada!",
      author: "Camila Torres",
      role: "Criadora de conteúdo",
      company: "Lifestyle & Viagens"
    }
  ];

  return (
    <SegmentLandingPage 
      segment="Criadores de Conteúdo"
      headline="Responda fãs e parceiros sem perder tempo. Automatize seu inbox."
      subheadline="Gerencie mensagens, agende conteúdo e mantenha relacionamentos com seguidores e marcas sem comprometer sua criatividade."
      problem="Você se sente sobrecarregado com a quantidade de mensagens que recebe diariamente? Perde horas respondendo comentários similares em vez de criar novo conteúdo? Tem dificuldade para gerenciar parcerias e manter uma comunicação consistente?"
      solution="O TechCare liberta seu tempo através de respostas automatizadas inteligentes, gerenciamento de inbox em várias plataformas e ferramentas de agendamento que mantêm sua conexão com seguidores mesmo enquanto você está criando seu próximo conteúdo."
      cta="Potencialize sua criação"
      features={features}
      testimonials={testimonials}
      bgColor="bg-purple-600"
      accentColor="text-purple-600"
    />
  );
};

export default ContentCreatorLandingPage;


import React from 'react';
import SegmentLandingPage from '@/components/landingpages/SegmentLandingPage';

const EcommerceLandingPage: React.FC = () => {
  const features = [
    {
      title: "Atendimento pós-venda",
      description: "Automatize o acompanhamento de pedidos, status de entrega e resolução de problemas pós-compra."
    },
    {
      title: "Rastreamento de pedidos",
      description: "Informe automaticamente seus clientes sobre o status de seus pedidos em tempo real."
    },
    {
      title: "Suporte via chat",
      description: "Atenda múltiplos clientes simultaneamente com nosso bot de vendas inteligente."
    },
    {
      title: "Recuperação de carrinho",
      description: "Recupere vendas perdidas com mensagens automáticas para clientes que abandonaram o carrinho."
    },
    {
      title: "Recomendação de produtos",
      description: "Nossa IA sugere produtos complementares com base no histórico de compras e comportamento do cliente."
    },
    {
      title: "Métricas de vendas",
      description: "Dashboard completo com análises de vendas, conversão e comportamento do cliente."
    }
  ];

  const testimonials = [
    {
      quote: "Aumentamos nossas vendas em 32% após implementar o TechCare. O bot de vendas realmente funciona!",
      author: "Ana Ferreira",
      role: "CEO",
      company: "ModaVip Store"
    },
    {
      quote: "A automação de pós-venda nos permitiu escalar o negócio sem precisar contratar mais pessoas para atendimento.",
      author: "Carlos Rodrigues",
      role: "Diretor de Operações",
      company: "TechGadget"
    },
    {
      quote: "As recomendações de produtos da IA são incrivelmente precisas. Nosso ticket médio aumentou 18%.",
      author: "Mariana Costa",
      role: "Marketing Manager",
      company: "BeautyShop Online"
    }
  ];

  return (
    <SegmentLandingPage 
      segment="Lojistas online (e-commerce)"
      headline="Otimize o atendimento da sua loja com automações e inteligência artificial"
      subheadline="Transforme seu e-commerce com atendimento automatizado, rastreamento de pedidos em tempo real e suporte 24/7 com nossa plataforma de automação."
      problem="Você perde horas respondendo mensagens iguais todos os dias? Seus clientes ficam insatisfeitos com a demora no atendimento ou nas atualizações sobre seus pedidos? A gestão de múltiplos canais de comunicação está se tornando um desafio impossível?"
      solution="O TechCare automatiza todo o processo de comunicação com seus clientes, desde o primeiro contato até o pós-venda. Nossa plataforma integra todos os canais de comunicação, usa IA para responder perguntas comuns e mantém seus clientes informados sobre o status de seus pedidos em tempo real."
      cta="Comece grátis"
      features={features}
      testimonials={testimonials}
      bgColor="bg-blue-600"
      accentColor="text-blue-600"
    />
  );
};

export default EcommerceLandingPage;

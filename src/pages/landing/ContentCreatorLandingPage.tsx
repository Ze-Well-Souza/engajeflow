import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowRight, Camera } from "lucide-react";

const ContentCreatorLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Criadores de Conteúdo</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/landing">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button variant="default">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Automatize sua presença digital e alcance mais seguidores</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Gerencie todas as suas redes sociais, programe posts e analise resultados em uma única plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/content-creator">
                <Button size="lg" variant="outline" className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para criadores de conteúdo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
            title="Agendamento de posts"
            description="Programe conteúdo para todas as suas redes sociais com semanas de antecedência"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>}
            title="Assistente IA"
            description="Gere ideias, legendas e hashtags otimizados para cada plataforma com inteligência artificial"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>}
            title="Analytics avançado"
            description="Acompanhe métricas de engajamento, crescimento e conversão em todas as plataformas"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>}
            title="Banco de mídia"
            description="Organize e acesse suas fotos e vídeos em um repositório centralizado na nuvem"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
            title="Gestão de comunidade"
            description="Responda comentários e mensagens de todas as plataformas em um único lugar"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path></svg>}
            title="Monetização"
            description="Gerencie parcerias, patrocínios e links de afiliados em um dashboard unificado"
          />
        </div>
      </section>

      {/* Multi-platform Integration */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integração com todas as plataformas</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Gerencie todo o seu conteúdo em um único lugar, com publicação sincronizada em todas as redes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
            <SocialIcon name="Instagram" color="#E4405F" />
            <SocialIcon name="TikTok" color="#000000" />
            <SocialIcon name="YouTube" color="#FF0000" />
            <SocialIcon name="Facebook" color="#1877F2" />
            <SocialIcon name="Twitter" color="#1DA1F2" />
            <SocialIcon name="LinkedIn" color="#0A66C2" />
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Assistente IA para criadores</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Nosso assistente de inteligência artificial ajuda você a criar conteúdo mais engajante e otimizado para cada plataforma.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Geração de legendas</h3>
                    <p className="text-gray-600 dark:text-gray-400">Crie legendas atraentes e otimizadas para cada plataforma</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sugestão de hashtags</h3>
                    <p className="text-gray-600 dark:text-gray-400">Receba recomendações de hashtags relevantes e em alta</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Ideias de conteúdo</h3>
                    <p className="text-gray-600 dark:text-gray-400">Supere o bloqueio criativo com sugestões personalizadas para seu nicho</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-80 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-blue-500"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                <p className="text-gray-500 dark:text-gray-400">Visualização do assistente IA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Calendar */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Calendário de conteúdo</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Planeje e visualize todo o seu conteúdo em um calendário intuitivo
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Dom</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Seg</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Ter</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Qua</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Qui</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Sex</div>
              <div className="text-center font-medium text-gray-500 dark:text-gray-400">Sáb</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <CalendarDay 
                  key={i} 
                  day={i + 1} 
                  hasInstagram={[2, 5, 8, 11, 14, 17, 20, 23, 26].includes(i + 1)}
                  hasTikTok={[3, 7, 10, 14, 17, 21, 24, 28].includes(i + 1)}
                  hasYouTube={[1, 8, 15, 22].includes(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Economizo pelo menos 10 horas por semana com o agendamento automático. O assistente IA me ajuda a criar legendas que realmente engajam meu público."
            author="Mariana Silva"
            role="Influenciadora de Lifestyle"
          />
          <TestimonialCard 
            quote="A análise unificada de todas as minhas redes sociais me deu insights valiosos sobre o que realmente funciona com meu público. Meu engajamento aumentou 45%."
            author="Pedro Oliveira"
            role="YouTuber de Tecnologia"
          />
          <TestimonialCard 
            quote="Consegui triplicar minha produção de conteúdo sem sacrificar a qualidade. A ferramenta é indispensável para quem trabalha com múltiplas plataformas."
            author="Juliana Santos"
            role="Criadora de Conteúdo Fitness"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 dark:bg-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para elevar seu conteúdo ao próximo nível?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão usando nossa plataforma para crescer nas redes sociais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/content-creator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-500">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para criadores de conteúdo desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Preços</Link></li>
                  <li><Link to="/demo/content-creator" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Privacidade</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} EngageFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente auxiliar para card de funcionalidade
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

// Componente auxiliar para card de depoimento
const TestimonialCard = ({ 
  quote, 
  author, 
  role 
}: { 
  quote: string; 
  author: string; 
  role: string;
}) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardContent className="pt-6">
      <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </CardContent>
  </Card>
);

// Componente para ícones de mídias sociais
const SocialIcon = ({
  name,
  color
}: {
  name: string;
  color: string;
}) => (
  <div className="flex flex-col items-center">
    <div 
      className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
      style={{ backgroundColor: `${color}20` }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

// Componente para dias do calendário
const CalendarDay = ({
  day,
  hasInstagram,
  hasTikTok,
  hasYouTube
}: {
  day: number;
  hasInstagram: boolean;
  hasTikTok: boolean;
  hasYouTube: boolean;
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 min-h-[100px]">
    <div className="text-right text-sm font-medium mb-2">{day}</div>
    <div className="space-y-1">
      {hasInstagram && (
        <div className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 text-xs p-1 rounded flex items-center gap-1">
          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
          Instagram
        </div>
      )}
      {hasTikTok && (
        <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs p-1 rounded flex items-center gap-1">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          TikTok
        </div>
      )}
      {hasYouTube && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs p-1 rounded flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          YouTube
        </div>
      )}
    </div>
  </div>
);

export default ContentCreatorLandingPage;

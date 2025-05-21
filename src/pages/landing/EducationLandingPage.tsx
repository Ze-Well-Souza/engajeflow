
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, BookOpen, MessageSquare, Users } from "lucide-react";

const EducationLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">TechCare Edu</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Recursos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Depoimentos</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Preços</a>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Login
            </Button>
          </div>
          <Button className="md:hidden">Menu</Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Automatize a comunicação com alunos e aumente a retenção
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A plataforma completa para educadores e criadores de cursos online responderem dúvidas, 
                enviarem materiais e organizarem listas de alunos - tudo com automação inteligente.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Começar gratuitamente
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg py-6">
                  Agendar demonstração
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Problemas que resolvemos para educadores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dúvidas repetitivas</h3>
                <p className="text-gray-600">
                  Pare de responder as mesmas perguntas sobre datas, materiais e acesso. Automatize as respostas frequentes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Evasão de alunos</h3>
                <p className="text-gray-600">
                  Mantenha seus alunos engajados com lembretes personalizados e acompanhamento automático do progresso.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Distribuição de materiais</h3>
                <p className="text-gray-600">
                  Envie materiais complementares, links de acesso e lembretes automaticamente para cada etapa do curso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Recursos para transformar sua comunicação com alunos
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Comunicação inteligente</h3>
                <ul className="space-y-4">
                  {[
                    "Respostas automáticas para perguntas frequentes",
                    "Chatbot com IA para dúvidas sobre o conteúdo",
                    "Envio programado de materiais complementares",
                    "Avisos de aulas e eventos",
                    "Campanhas de engajamento para alunos inativos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Gestão facilitada</h3>
                <ul className="space-y-4">
                  {[
                    "Lista de alunos centralizada e segmentada",
                    "Acompanhamento de progresso automático",
                    "Relatórios de engajamento e retenção",
                    "Integração com plataformas de cursos (Hotmart, Teachable, etc)",
                    "Análise de sentimento nos feedbacks recebidos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para transformar sua comunicação com alunos?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Economize tempo, aumente a retenção e proporcione uma experiência excepcional para seus alunos.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-lg">
              Começar agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              O que educadores dizem sobre nós
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Reduzi em 70% o tempo gasto respondendo mensagens repetitivas. Agora posso me dedicar ao conteúdo das aulas.",
                  author: "Marina Silva",
                  role: "Professora de Marketing Digital"
                },
                {
                  quote: "A retenção dos meus alunos aumentou significativamente desde que implementei os lembretes automáticos de aulas e materiais.",
                  author: "Carlos Mendes",
                  role: "Instrutor de Programação"
                },
                {
                  quote: "Consegui escalar meu curso online sem perder a qualidade no atendimento aos alunos. A automação inteligente faz toda diferença.",
                  author: "Juliana Costa",
                  role: "Coach de Produtividade"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Planos que cabem no seu bolso
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Iniciante",
                  price: "Grátis",
                  description: "Para educadores iniciantes",
                  features: [
                    "Até 100 alunos",
                    "Respostas automáticas básicas",
                    "Envio de materiais",
                    "Suporte por email"
                  ]
                },
                {
                  name: "Profissional",
                  price: "R$ 97/mês",
                  description: "Para cursos em crescimento",
                  features: [
                    "Até 1.000 alunos",
                    "IA para respostas personalizadas",
                    "Campanhas de engajamento",
                    "Relatórios avançados",
                    "Integrações com plataformas"
                  ],
                  highlighted: true
                },
                {
                  name: "Escola",
                  price: "R$ 297/mês",
                  description: "Para escolas online",
                  features: [
                    "Alunos ilimitados",
                    "Múltiplos cursos e turmas",
                    "API completa",
                    "Atendente virtual dedicado",
                    "Suporte prioritário"
                  ]
                }
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`${
                    plan.highlighted
                      ? "bg-white border-2 border-blue-600 shadow-lg relative mt-[-1rem] pb-8"
                      : "bg-white border border-gray-200"
                  } p-6 rounded-xl`}
                >
                  {plan.highlighted && (
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-800 hover:bg-gray-900"
                    }`}
                  >
                    Escolher plano
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">TechCare Edu</h3>
              <p>Soluções de automação e IA para educadores e criadores de conteúdo.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Integrações</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Parceiros</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Termos de uso</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} TechCare Edu. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EducationLandingPage;

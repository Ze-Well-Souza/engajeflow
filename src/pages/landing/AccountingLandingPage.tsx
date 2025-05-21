
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FileText, Calendar, Clock } from "lucide-react";

const AccountingLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">TechCare Legal</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600">Recursos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-green-600">Depoimentos</a>
            <a href="#pricing" className="text-gray-600 hover:text-green-600">Preços</a>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
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
                Menos WhatsApp manual, mais foco nos seus clientes e prazos
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sistema inteligente para contadores e advogados automatizarem atualizações de processos, 
                envio de documentos e lembretes para clientes, economizando tempo valioso.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg py-6">
                  Começar gratuitamente
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-lg py-6">
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
              Problemas que resolvemos para contadores e advogados
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cobrança de documentos</h3>
                <p className="text-gray-600">
                  Automatize lembretes para entrega de documentos e reduza o tempo gasto com cobranças repetitivas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Prazos importantes</h3>
                <p className="text-gray-600">
                  Gerenciamento automático de prazos fiscais e processuais com alertas para você e seus clientes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Atualização de status</h3>
                <p className="text-gray-600">
                  Mantenha clientes informados sobre o andamento de processos e obrigações sem esforço manual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Recursos para otimizar sua comunicação com clientes
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Automação de comunicação</h3>
                <ul className="space-y-4">
                  {[
                    "Lembretes automáticos para entrega de documentos",
                    "Notificações de prazos próximos (DAS, IRPF, processos)",
                    "Confirmação de recebimento e processamento",
                    "Atualizações de status de processos",
                    "Envio programado de relatórios e documentos"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Gestão de relacionamento</h3>
                <ul className="space-y-4">
                  {[
                    "Portal do cliente para acompanhamento de status",
                    "Agendamento automático de reuniões",
                    "Chatbot para dúvidas frequentes (MEI, CNAE, obrigações)",
                    "Pesquisas de satisfação programadas",
                    "Registros completos de comunicações e documentos"
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
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para automatizar sua comunicação com clientes?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Economize horas por semana e proporcione uma experiência profissional para seus clientes.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 text-lg">
              Começar agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              O que profissionais dizem sobre nós
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Economizei mais de 15 horas por semana em comunicação com clientes. Agora posso me dedicar ao trabalho técnico que realmente importa.",
                  author: "Carlos Ribeiro",
                  role: "Contador, CR Contabilidade"
                },
                {
                  quote: "Meus clientes elogiam a comunicação clara e constante. A automação inteligente parece personalizada, mas não exige meu tempo.",
                  author: "Dra. Ana Paula Sousa",
                  role: "Advogada Tributarista"
                },
                {
                  quote: "Os lembretes automáticos reduziram em 70% os atrasos na entrega de documentos pelos clientes. Isso melhorou todo nosso fluxo de trabalho.",
                  author: "Marcos Oliveira",
                  role: "Escritório Contábil MO"
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
              Planos que cabem no seu escritório
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Profissional",
                  price: "R$ 197/mês",
                  description: "Para profissionais autônomos",
                  features: [
                    "Até 30 clientes",
                    "Automação básica de mensagens",
                    "Lembretes de prazos",
                    "Suporte por email"
                  ]
                },
                {
                  name: "Escritório",
                  price: "R$ 497/mês",
                  description: "Para escritórios em crescimento",
                  features: [
                    "Até 100 clientes",
                    "Portal do cliente",
                    "Automações avançadas",
                    "Chatbot personalizado",
                    "Integrações com sistemas"
                  ],
                  highlighted: true
                },
                {
                  name: "Enterprise",
                  price: "R$ 997/mês",
                  description: "Para escritórios estabelecidos",
                  features: [
                    "Clientes ilimitados",
                    "Personalização completa",
                    "API avançada",
                    "Suporte dedicado",
                    "Onboarding personalizado"
                  ]
                }
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`${
                    plan.highlighted
                      ? "bg-white border-2 border-green-600 shadow-lg relative mt-[-1rem] pb-8"
                      : "bg-white border border-gray-200"
                  } p-6 rounded-xl`}
                >
                  {plan.highlighted && (
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                        ? "bg-green-600 hover:bg-green-700"
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
              <h3 className="text-xl font-bold mb-4 text-white">TechCare Legal</h3>
              <p>Soluções de automação e IA para contadores e advogados.</p>
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
            <p>&copy; {new Date().getFullYear()} TechCare Legal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AccountingLandingPage;

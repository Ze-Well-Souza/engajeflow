
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, Calendar, MessageCircle } from "lucide-react";

const HRLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">TechCare RH</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-purple-600">Recursos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600">Depoimentos</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">Preços</a>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
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
                Transforme o contato com candidatos em uma experiência eficiente
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Automatize o agendamento de entrevistas e feedback para candidatos, potencializando 
                o desempenho da sua equipe de RH com soluções inteligentes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg py-6">
                  Começar gratuitamente
                </Button>
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 text-lg py-6">
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
              Problemas que resolvemos para equipes de RH
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agendamento manual</h3>
                <p className="text-gray-600">
                  Elimine o vai-e-vem de emails e mensagens para agendar entrevistas com os candidatos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunicação ineficiente</h3>
                <p className="text-gray-600">
                  Automatize o envio de feedbacks e atualizações de processo para todos os candidatos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Experiência do candidato</h3>
                <p className="text-gray-600">
                  Melhore a percepção da sua empresa com uma comunicação profissional e ágil em todas as etapas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Recursos para otimizar seus processos seletivos
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Agendamento inteligente</h3>
                <ul className="space-y-4">
                  {[
                    "Agendamento automático com base na disponibilidade dos recrutadores",
                    "Lembretes personalizados para entrevistas",
                    "Reagendamento simplificado",
                    "Integração com Google Calendar, Outlook e outros",
                    "Link de agendamento personalizado para cada vaga"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Comunicação avançada</h3>
                <ul className="space-y-4">
                  {[
                    "Templates personalizados para cada etapa do processo",
                    "Feedback automatizado com base em critérios pré-definidos",
                    "Chatbot para dúvidas frequentes dos candidatos",
                    "Pesquisas de satisfação pós-processo",
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
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para revolucionar seus processos seletivos?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Economize tempo, melhore a experiência dos candidatos e potencialize os resultados da sua equipe de RH.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 text-lg">
              Começar agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              O que profissionais de RH dizem sobre nós
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Reduzimos o tempo de agendamento de entrevistas em 80% e melhoramos significativamente o feedback dos candidatos sobre nosso processo.",
                  author: "Roberto Almeida",
                  role: "Gerente de RH, TechSolutions"
                },
                {
                  quote: "A automação das comunicações nos permitiu escalar nossos processos seletivos sem adicionar mais pessoas ao time de recrutamento.",
                  author: "Fernanda Costa",
                  role: "Head de Talent Acquisition, StartupX"
                },
                {
                  quote: "O feedback automático para todos os candidatos melhorou nossa marca empregadora e aumentou o número de referências de candidatos.",
                  author: "Paulo Mendes",
                  role: "Diretor de RH, Empresa Nacional"
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
              Planos que se adaptam ao tamanho da sua empresa
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Startup",
                  price: "R$ 147/mês",
                  description: "Para pequenas empresas",
                  features: [
                    "Até 10 vagas simultaneas",
                    "Agendamento automatizado",
                    "Templates básicos",
                    "Suporte por email"
                  ]
                },
                {
                  name: "Business",
                  price: "R$ 347/mês",
                  description: "Para empresas em crescimento",
                  features: [
                    "Até 30 vagas simultaneas",
                    "IA para feedback personalizado",
                    "Integração com ATS",
                    "Análise de candidatos",
                    "Suporte prioritário"
                  ],
                  highlighted: true
                },
                {
                  name: "Enterprise",
                  price: "R$ 897/mês",
                  description: "Para grandes corporações",
                  features: [
                    "Vagas ilimitadas",
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
                      ? "bg-white border-2 border-purple-600 shadow-lg relative mt-[-1rem] pb-8"
                      : "bg-white border border-gray-200"
                  } p-6 rounded-xl`}
                >
                  {plan.highlighted && (
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                        ? "bg-purple-600 hover:bg-purple-700"
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
              <h3 className="text-xl font-bold mb-4 text-white">TechCare RH</h3>
              <p>Soluções de automação e IA para departamentos de Recursos Humanos.</p>
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
            <p>&copy; {new Date().getFullYear()} TechCare RH. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HRLandingPage;

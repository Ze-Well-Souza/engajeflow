import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star, Users, Calendar, Shield } from "lucide-react";

const HousekeeperLandingPage: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Agendamento Inteligente",
      description: "Sistema automatizado de agendamento com confirmação por WhatsApp"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Gestão de Tempo",
      description: "Otimize seus horários e maximize sua produtividade"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Base de Clientes",
      description: "Organize e mantenha relacionamento com seus clientes"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Pagamentos Seguros",
      description: "Receba pagamentos de forma segura e automatizada"
    }
  ];

  const services = [
    {
      title: "Limpeza Residencial",
      description: "Serviços completos para residências",
      items: [
        "Limpeza geral",
        "Organização",
        "Limpeza profunda"
      ]
    },
    {
      title: "Limpeza Comercial",
      description: "Soluções para escritórios e comércios",
      items: [
        "Escritórios",
        "Lojas",
        "Consultórios"
      ]
    },
    {
      title: "Serviços Especiais",
      description: "Serviços diferenciados e especializados",
      items: [
        "Pós-obra",
        "Eventos",
        "Mudanças"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      title: "Diarista Profissional",
      text: "O TechCare revolucionou meu negócio. Agora tenho controle total dos meus agendamentos e meus clientes adoram a praticidade!",
      stars: 5
    },
    {
      name: "Ana Costa",
      title: "Empreendedora",
      text: "Aumentei minha receita em 40% no primeiro mês. A organização que o sistema oferece é incrível!",
      stars: 5
    },
    {
      name: "João Santos",
      title: "Prestador de Serviços",
      text: "Sistema muito fácil de usar. Meus clientes ficaram impressionados com a profissionalização do meu serviço.",
      stars: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TechCare</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Recursos</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600">Serviços</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Depoimentos</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Preços</a>
          </nav>
          <Button>Começar Agora</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            🏠 Solução para Diaristas
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transforme Seu Negócio de
            <span className="text-blue-600"> Limpeza</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sistema completo para diaristas profissionais. Gerencie agendamentos, 
            clientes e pagamentos em uma única plataforma inteligente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Começar Teste Grátis
            </Button>
            <Button size="lg" variant="outline">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para profissionalizar seu serviço
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Serviços Personalizados
            </h2>
            <p className="text-xl text-gray-600">
              Configure seus serviços de acordo com sua especialidade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Limpeza Residencial</CardTitle>
                <CardDescription>Serviços completos para residências</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Limpeza geral
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Organização
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Limpeza profunda
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Limpeza Comercial</CardTitle>
                <CardDescription>Soluções para escritórios e comércios</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Escritórios
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Lojas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Consultórios
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Serviços Especiais</CardTitle>
                <CardDescription>Serviços diferenciados e especializados</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Pós-obra
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Eventos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Mudanças
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "O TechCare revolucionou meu negócio. Agora tenho controle total dos meus agendamentos e meus clientes adoram a praticidade!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria Silva</p>
                    <p className="text-sm text-gray-500">Diarista Profissional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Aumentei minha receita em 40% no primeiro mês. A organização que o sistema oferece é incrível!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Ana Costa</p>
                    <p className="text-sm text-gray-500">Empreendedora</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Sistema muito fácil de usar. Meus clientes ficaram impressionados com a profissionalização do meu serviço."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">J</span>
                  </div>
                  <div>
                    <p className="font-semibold">João Santos</p>
                    <p className="text-sm text-gray-500">Prestador de Serviços</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Transformar Seu Negócio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece hoje mesmo e veja a diferença em poucos dias
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Começar Teste Grátis de 14 Dias
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">TC</span>
                </div>
                <span className="text-xl font-bold">TechCare</span>
              </div>
              <p className="text-gray-400">
                Transformando negócios através da tecnologia
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Recursos</li>
                <li>Preços</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentação</li>
                <li>Tutoriais</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechCare Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HousekeeperLandingPage;

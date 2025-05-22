import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CheckCircle } from "lucide-react";

interface AgendamentoDemoProps {
  segment?: string;
}

const AgendamentoDemo: React.FC<AgendamentoDemoProps> = ({ segment = "default" }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string | undefined>(undefined);
  const [professional, setProfessional] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dados específicos por segmento
  const segmentData: Record<string, {
    title: string;
    services: string[];
    professionals: string[];
    color: string;
  }> = {
    beauty: {
      title: "Agendamento de Serviços de Beleza",
      services: ["Corte de Cabelo", "Coloração", "Manicure", "Pedicure", "Tratamento Facial", "Design de Sobrancelhas"],
      professionals: ["Ana Silva", "Carlos Oliveira", "Mariana Santos", "Roberto Alves"],
      color: "text-pink-500"
    },
    food: {
      title: "Reserva de Mesa",
      services: ["Almoço", "Jantar", "Café da Manhã", "Brunch", "Evento Privado", "Degustação"],
      professionals: ["Salão Principal", "Área Externa", "Mezanino", "Sala VIP"],
      color: "text-orange-500"
    },
    freelancer: {
      title: "Agendamento de Serviços Domésticos",
      services: ["Limpeza Residencial", "Reparos Elétricos", "Encanamento", "Pintura", "Montagem de Móveis", "Jardinagem"],
      professionals: ["José Silva", "Maria Oliveira", "Pedro Santos", "Carla Lima"],
      color: "text-blue-500"
    },
    "content-creator": {
      title: "Agendamento de Serviços para Eventos",
      services: ["Fotografia", "Filmagem", "Decoração", "Buffet", "DJ/Som", "Assessoria Completa"],
      professionals: ["Estúdio Visual", "Decor & Festa", "Som & Luz", "Equipe Completa"],
      color: "text-purple-500"
    },
    education: {
      title: "Agendamento de Aulas",
      services: ["Aula Particular", "Mentoria", "Workshop", "Curso Intensivo", "Avaliação", "Reforço Escolar"],
      professionals: ["Prof. Ricardo", "Profa. Juliana", "Prof. Eduardo", "Profa. Camila"],
      color: "text-green-500"
    },
    ecommerce: {
      title: "Agendamento de Consultoria",
      services: ["Estratégia de Vendas", "Otimização de Marketplace", "SEO para E-commerce", "Gestão de Anúncios", "Logística", "Atendimento ao Cliente"],
      professionals: ["Equipe de Marketing", "Equipe de Operações", "Equipe de Tecnologia", "Consultoria Completa"],
      color: "text-yellow-500"
    },
    hr: {
      title: "Agendamento de Entrevistas",
      services: ["Entrevista Inicial", "Avaliação Técnica", "Entrevista com Gestor", "Dinâmica em Grupo", "Teste Psicológico", "Onboarding"],
      professionals: ["Depto. RH", "Gerência", "Diretoria", "Equipe Técnica"],
      color: "text-indigo-500"
    },
    accounting: {
      title: "Agendamento de Consulta",
      services: ["Consultoria Contábil", "Consultoria Jurídica", "Planejamento Tributário", "Análise Financeira", "Regularização", "Abertura/Encerramento"],
      professionals: ["Dr. Roberto", "Dra. Fernanda", "Dr. Carlos", "Dra. Mariana"],
      color: "text-gray-500"
    },
    default: {
      title: "Agendamento de Serviço",
      services: ["Consultoria", "Suporte", "Treinamento", "Avaliação", "Implementação", "Manutenção"],
      professionals: ["Equipe A", "Equipe B", "Equipe C", "Especialista"],
      color: "text-primary"
    }
  };

  // Obter dados do segmento atual ou usar padrão
  const data = segment && segmentData[segment] ? segmentData[segment] : segmentData.default;

  // Horários disponíveis
  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDate(undefined);
    setTime(undefined);
    setName("");
    setEmail("");
    setPhone("");
    setService(undefined);
    setProfessional(undefined);
    setIsSubmitted(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className={data.color}>{data.title}</CardTitle>
        <CardDescription>
          {isSubmitted ? "Agendamento confirmado!" : `Passo ${step} de 3`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Agendamento Confirmado!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Seu agendamento foi confirmado com sucesso. Enviamos um e-mail de confirmação para {email}.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-left max-w-md mx-auto mb-6">
              <p className="mb-2"><strong>Serviço:</strong> {service}</p>
              <p className="mb-2"><strong>Profissional:</strong> {professional}</p>
              <p className="mb-2"><strong>Data:</strong> {date ? format(date, "PPP", { locale: ptBR }) : ""}</p>
              <p className="mb-2"><strong>Horário:</strong> {time}</p>
              <p className="mb-2"><strong>Nome:</strong> {name}</p>
              <p className="mb-2"><strong>Telefone:</strong> {phone}</p>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Serviço</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.services.map((svc) => (
                        <SelectItem key={svc} value={svc}>{svc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professional">Profissional</Label>
                  <Select value={professional} onValueChange={setProfessional}>
                    <SelectTrigger id="professional">
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.professionals.map((prof) => (
                        <SelectItem key={prof} value={prof}>{prof}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ptBR}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getDay() === 0; // Desabilita datas passadas e domingos
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Digite seu telefone"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isSubmitted ? (
          <Button onClick={handleReset} className="w-full">
            Fazer novo agendamento
          </Button>
        ) : (
          <>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
            <Button 
              onClick={handleNext}
              disabled={
                (step === 1 && (!service || !professional)) ||
                (step === 2 && (!date || !time)) ||
                (step === 3 && (!name || !email || !phone))
              }
            >
              {step === 3 ? "Confirmar agendamento" : "Próximo"}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default AgendamentoDemo;

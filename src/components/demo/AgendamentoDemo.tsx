import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import AgendamentoHousekeeper from "@/components/fluxos/AgendamentoHousekeeper";
import AgendamentoChef from "@/components/fluxos/AgendamentoChef";
import AgendamentoRealEstate from "@/components/fluxos/AgendamentoRealEstate";

interface AgendamentoDemoProps {
  segment?: string;
  title?: string;
  services?: { id: string; name: string }[];
  professionals?: { id: string; name: string }[];
  timeSlots?: string[];
}

const AgendamentoDemo: React.FC<AgendamentoDemoProps> = ({
  segment = "beauty",
  title,
  services,
  professionals,
  timeSlots
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Conteúdo personalizado por segmento
  if (segment === "housekeeper") {
    return <AgendamentoHousekeeper />;
  }
  
  if (segment === "chef") {
    return <AgendamentoChef />;
  }
  
  if (segment === "realestate") {
    return <AgendamentoRealEstate />;
  }
  
  // Definições padrão para serviços, profissionais e horários
  const defaultServices = services || [
    { id: "1", name: "Corte de Cabelo" },
    { id: "2", name: "Manicure" },
    { id: "3", name: "Pedicure" },
    { id: "4", name: "Coloração" }
  ];

  const defaultProfessionals = professionals || [
    { id: "1", name: "Alex Silva" },
    { id: "2", name: "Beatriz Oliveira" },
    { id: "3", name: "Carlos Santos" }
  ];

  const defaultTimeSlots = timeSlots || [
    "09:00", "09:30", "10:00", "10:30", "11:00", 
    "11:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  // Função para avançar para a próxima etapa
  const handleNext = () => {
    setStep(step + 1);
  };

  // Função para voltar para a etapa anterior
  const handleBack = () => {
    setStep(step - 1);
  };

  // Função para simular o agendamento
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de requisição
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Resetar após 3 segundos
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setSelectedService("");
        setSelectedProfessional("");
        setSelectedTime("");
      }, 3000);
    }, 1500);
  };

  // Título dinâmico baseado na prop ou no segmento
  const pageTitle = title || (
    segment === "beauty" ? "Agendamento de Serviços de Beleza" :
    segment === "food" ? "Reserva de Mesa ou Pedido" :
    segment === "freelancer" ? "Agendamento de Serviços" :
    segment === "content-creator" ? "Agendamento de Sessão de Fotos" :
    segment === "education" ? "Agendamento de Aula" :
    segment === "ecommerce" ? "Agendamento de Entrega" :
    segment === "hr" ? "Agendamento de Entrevista" :
    segment === "accounting" ? "Agendamento de Consultoria" :
    "Agendamento de Serviço"
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{pageTitle}</CardTitle>
        <CardDescription>
          Agende seu horário com nossos profissionais
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {isSuccess ? (
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Agendamento Realizado</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Seu agendamento foi confirmado com sucesso!
            </p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Selecione o Serviço</Label>
                  <Select 
                    value={selectedService} 
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="professional">Selecione o Profissional</Label>
                  <Select 
                    value={selectedProfessional} 
                    onValueChange={setSelectedProfessional}
                  >
                    <SelectTrigger id="professional">
                      <SelectValue placeholder="Selecione um profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultProfessionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id}>
                          {professional.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedService || !selectedProfessional}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione a Data</Label>
                  <div className="border rounded-md p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={ptBR}
                      disabled={{ before: new Date() }}
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedDate}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione o Horário</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {defaultTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedTime}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Confirme seu agendamento</h3>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Serviço:</div>
                    <div>{defaultServices.find(s => s.id === selectedService)?.name}</div>
                    
                    <div className="font-medium">Profissional:</div>
                    <div>{defaultProfessionals.find(p => p.id === selectedProfessional)?.name}</div>
                    
                    <div className="font-medium">Data:</div>
                    <div>{selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}</div>
                    
                    <div className="font-medium">Horário:</div>
                    <div>{selectedTime}</div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AgendamentoDemo;


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Building, Clock, Calendar as CalendarIcon, MapPin } from "lucide-react";

const AgendamentoRealEstate: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dados das propriedades
  const properties = [
    { id: "1", name: "Apartamento Jardins - 2 quartos", address: "R. dos Pinheiros, 123 - Jardins" },
    { id: "2", name: "Casa Vila Nova - 3 quartos", address: "Av. São João, 456 - Vila Nova" },
    { id: "3", name: "Cobertura Centro - 4 quartos", address: "R. Augusta, 789 - Centro" },
    { id: "4", name: "Apartamento Conceição - 2 quartos", address: "R. das Flores, 321 - Conceição" }
  ];

  // Dados dos corretores
  const agents = [
    { id: "1", name: "Carlos Silva" },
    { id: "2", name: "Ana Oliveira" },
    { id: "3", name: "Roberto Santos" }
  ];

  // Horários disponíveis
  const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
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
      
      // Resetar após 5 segundos
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setSelectedProperty("");
        setSelectedAgent("");
        setSelectedTime("");
        setNome("");
        setTelefone("");
        setEmail("");
        setMensagem("");
      }, 5000);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          <CardTitle>Agendamento de Visita a Imóvel</CardTitle>
        </div>
        <CardDescription>
          Agende uma visita ao imóvel de seu interesse com um de nossos corretores
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isSuccess ? (
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Agendamento Confirmado!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sua visita foi agendada com sucesso. O corretor entrará em contato para confirmar.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-left mb-4">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Imóvel:</span>
                  <span>{properties.find(p => p.id === selectedProperty)?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Endereço:</span>
                  <span>{properties.find(p => p.id === selectedProperty)?.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Data:</span>
                  <span>{selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Horário:</span>
                  <span>{selectedTime}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsSuccess(false)}>Agendar nova visita</Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="property">Selecione o Imóvel</Label>
                  <Select 
                    value={selectedProperty} 
                    onValueChange={setSelectedProperty}
                  >
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Selecione um imóvel" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedProperty && (
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Endereço:</span>
                    </div>
                    <div className="pl-6">
                      {properties.find(p => p.id === selectedProperty)?.address}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="agent">Selecione o Corretor</Label>
                  <Select 
                    value={selectedAgent} 
                    onValueChange={setSelectedAgent}
                  >
                    <SelectTrigger id="agent">
                      <SelectValue placeholder="Selecione um corretor" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedProperty || !selectedAgent}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione a Data da Visita</Label>
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
                
                <div className="space-y-2">
                  <Label>Selecione o Horário</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-blue-600 hover:bg-blue-700" : ""}
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
                    disabled={!selectedDate || !selectedTime}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Seu Nome</Label>
                  <Input 
                    id="nome" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    type="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                  <Textarea 
                    id="mensagem" 
                    value={mensagem} 
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Inclua qualquer informação adicional que julgar relevante"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!nome || !telefone || !email}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Confirme sua visita</h3>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className="font-medium">Imóvel:</div>
                      <div>{properties.find(p => p.id === selectedProperty)?.name}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Endereço:</div>
                      <div>{properties.find(p => p.id === selectedProperty)?.address}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Corretor:</div>
                      <div>{agents.find(a => a.id === selectedAgent)?.name}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Data:</div>
                      <div>{selectedDate ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Horário:</div>
                      <div>{selectedTime}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Nome:</div>
                      <div>{nome}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">Telefone:</div>
                      <div>{telefone}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium">E-mail:</div>
                      <div>{email}</div>
                    </div>
                  </div>
                  
                  {mensagem && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="font-medium">Mensagem:</div>
                      <div className="mt-1">{mensagem}</div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
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

export default AgendamentoRealEstate;

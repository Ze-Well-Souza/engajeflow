import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Clock, Home, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AgendamentoHousekeeperProps {
  onScheduleComplete: (data: any) => void;
}

const AgendamentoHousekeeper: React.FC<AgendamentoHousekeeperProps> = ({ onScheduleComplete }) => {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDetails, setServiceDetails] = useState("");
  const [serviceFrequency, setServiceFrequency] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const serviceTypes = [
    { value: "residential", label: "Limpeza Residencial" },
    { value: "post_construction", label: "Limpeza Pós-obra" },
    { value: "office", label: "Limpeza de Escritório" },
    { value: "ironing", label: "Passadoria" },
    { value: "windows", label: "Limpeza de Vidros" }
  ];

  const serviceFrequencies = [
    { value: "once", label: "Uma vez (avulso)" },
    { value: "weekly", label: "Semanal" },
    { value: "biweekly", label: "Quinzenal" },
    { value: "monthly", label: "Mensal" }
  ];

  const serviceDurations = [
    { value: "4h", label: "Meia Diária (4h)" },
    { value: "8h", label: "Diária Completa (8h)" },
    { value: "custom", label: "Personalizado" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "12:00", "13:00", "14:00", "15:00"
  ];

  const additionalServiceOptions = [
    { id: "windows", label: "Limpeza de Vidros" },
    { id: "ironing", label: "Passadoria" },
    { id: "refrigerator", label: "Limpeza de Geladeira" },
    { id: "oven", label: "Limpeza de Forno" },
    { id: "cabinets", label: "Limpeza de Armários" }
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Dados para enviar ao componente pai
      const scheduleData = {
        serviceType,
        serviceAddress,
        serviceDetails,
        serviceFrequency,
        date: date ? format(date, 'dd/MM/yyyy') : '',
        time,
        duration,
        additionalServices: additionalServices.map(id => 
          additionalServiceOptions.find(option => option.id === id)?.label
        ),
        name,
        phone,
        email,
        notes,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      
      onScheduleComplete(scheduleData);
    }, 1500);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return serviceType !== "" && serviceAddress !== "" && serviceFrequency !== "";
      case 2:
        return date !== undefined && time !== "" && duration !== "";
      case 3:
        return name !== "" && phone !== "" && email !== "";
      default:
        return true;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!isComplete ? (
        <>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm mt-2">Serviço</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm mt-2">Data</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-sm mt-2">Contato</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 4 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                4
              </div>
              <span className="text-sm mt-2">Confirmação</span>
            </div>
          </div>

          {/* Step Content */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Detalhes do Serviço"}
                {step === 2 && "Escolha a Data e Horário"}
                {step === 3 && "Seus Dados de Contato"}
                {step === 4 && "Confirme seu Agendamento"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Informe os detalhes do serviço de limpeza que você precisa"}
                {step === 2 && "Selecione a data, horário e duração do serviço"}
                {step === 3 && "Preencha seus dados para que possamos entrar em contato"}
                {step === 4 && "Verifique se todas as informações estão corretas"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Tipo de Serviço</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger id="serviceType">
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceAddress">Endereço do Serviço</Label>
                    <Input
                      id="serviceAddress"
                      placeholder="Digite o endereço completo"
                      value={serviceAddress}
                      onChange={(e) => setServiceAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceFrequency">Frequência do Serviço</Label>
                    <Select value={serviceFrequency} onValueChange={setServiceFrequency}>
                      <SelectTrigger id="serviceFrequency">
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceFrequencies.map((frequency) => (
                          <SelectItem key={frequency.value} value={frequency.value}>
                            {frequency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="serviceDetails">Detalhes do Imóvel</Label>
                    <Textarea
                      id="serviceDetails"
                      placeholder="Descreva o tamanho do imóvel, número de cômodos, etc."
                      value={serviceDetails}
                      onChange={(e) => setServiceDetails(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data do Serviço</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
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
                            // Desabilita datas passadas
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário do Serviço</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração do Serviço</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceDurations.map((duration) => (
                          <SelectItem key={duration.value} value={duration.value}>
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Serviços Adicionais (opcional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                      {additionalServiceOptions.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={service.id} 
                            checked={additionalServices.includes(service.id)}
                            onCheckedChange={() => toggleAdditionalService(service.id)}
                          />
                          <Label htmlFor={service.id} className="cursor-pointer">
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Informações adicionais sobre o serviço"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Detalhes do Serviço</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-start gap-2">
                          <Home className="h-5 w-5 text-teal-500 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {serviceTypes.find(t => t.value === serviceType)?.label || serviceType}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">{serviceAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-teal-500" />
                          <p>
                            Frequência: {serviceFrequencies.find(f => f.value === serviceFrequency)?.label || serviceFrequency}
                          </p>
                        </div>
                        {serviceDetails && (
                          <div className="mt-2">
                            <p className="text-gray-500 dark:text-gray-400">{serviceDetails}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Data e Horário</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-teal-500" />
                          <p>{date ? format(date, "PPP", { locale: ptBR }) : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-teal-500" />
                          <p>{time} - {serviceDurations.find(d => d.value === duration)?.label || duration}</p>
                        </div>
                      </div>
                      
                      {additionalServices.length > 0 && (
                        <div className="mt-3">
                          <p className="font-medium mb-1">Serviços Adicionais:</p>
                          <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                            {additionalServices.map(serviceId => (
                              <li key={serviceId}>
                                {additionalServiceOptions.find(option => option.id === serviceId)?.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Seus Dados</h3>
                      <div className="grid grid-cols-1 gap-1">
                        <p><span className="font-medium">Nome:</span> {name}</p>
                        <p><span className="font-medium">Telefone:</span> {phone}</p>
                        <p><span className="font-medium">E-mail:</span> {email}</p>
                        {notes && (
                          <div className="mt-2">
                            <p className="font-medium">Observações:</p>
                            <p className="text-gray-500 dark:text-gray-400">{notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 4 ? (
                <Button onClick={handleNext} disabled={!isStepValid()} className="bg-teal-600 hover:bg-teal-700">
                  Continuar
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
                  {isSubmitting ? "Enviando..." : "Confirmar Agendamento"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-teal-600">Agendamento Confirmado!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-teal-600" />
              </div>
              
              <p className="text-lg">
                Seu serviço de limpeza foi agendado com sucesso para o dia{" "}
                <span className="font-medium">{date ? format(date, "PPP", { locale: ptBR }) : ""}</span> às{" "}
                <span className="font-medium">{time}</span>.
              </p>
              
              <p className="text-gray-500 dark:text-gray-400">
                Um de nossos profissionais entrará em contato para confirmar os detalhes.
                Você também receberá um e-mail com a confirmação do agendamento.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()} className="bg-teal-600 hover:bg-teal-700">
              Fazer Novo Agendamento
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AgendamentoHousekeeper;

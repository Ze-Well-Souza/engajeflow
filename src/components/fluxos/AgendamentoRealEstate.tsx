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
import { CalendarIcon, Check, Clock, MapPin } from "lucide-react";

interface AgendamentoRealEstateProps {
  onScheduleComplete: (data: any) => void;
}

const AgendamentoRealEstate: React.FC<AgendamentoRealEstateProps> = ({ onScheduleComplete }) => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [visitType, setVisitType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const propertyTypes = [
    { value: "apartment", label: "Apartamento" },
    { value: "house", label: "Casa" },
    { value: "commercial", label: "Imóvel Comercial" },
    { value: "land", label: "Terreno" }
  ];

  const visitTypes = [
    { value: "visit", label: "Visita ao Imóvel" },
    { value: "evaluation", label: "Avaliação de Imóvel" },
    { value: "consultation", label: "Consultoria Imobiliária" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Dados para enviar ao componente pai
      const scheduleData = {
        propertyType,
        propertyAddress,
        visitType,
        date: date ? format(date, 'dd/MM/yyyy') : '',
        time,
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
        return propertyType !== "" && propertyAddress !== "" && visitType !== "";
      case 2:
        return date !== undefined && time !== "";
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm mt-2">Imóvel</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm mt-2">Data</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-sm mt-2">Contato</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                4
              </div>
              <span className="text-sm mt-2">Confirmação</span>
            </div>
          </div>

          {/* Step Content */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Informações do Imóvel"}
                {step === 2 && "Escolha a Data e Horário"}
                {step === 3 && "Seus Dados de Contato"}
                {step === 4 && "Confirme seu Agendamento"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Informe os detalhes do imóvel que deseja visitar ou avaliar"}
                {step === 2 && "Selecione a data e horário disponíveis para sua visita"}
                {step === 3 && "Preencha seus dados para que possamos entrar em contato"}
                {step === 4 && "Verifique se todas as informações estão corretas"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Tipo de Imóvel</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Selecione o tipo de imóvel" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Endereço do Imóvel</Label>
                    <Input
                      id="propertyAddress"
                      placeholder="Digite o endereço completo"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visitType">Tipo de Visita</Label>
                    <Select value={visitType} onValueChange={setVisitType}>
                      <SelectTrigger id="visitType">
                        <SelectValue placeholder="Selecione o tipo de visita" />
                      </SelectTrigger>
                      <SelectContent>
                        {visitTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data da Visita</Label>
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
                            // Desabilita datas passadas e finais de semana
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const day = date.getDay();
                            return date < today || day === 0 || day === 6;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Horário da Visita</Label>
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
                      placeholder="Informações adicionais sobre a visita"
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
                      <h3 className="font-medium text-lg mb-2">Detalhes do Imóvel</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {propertyTypes.find(t => t.value === propertyType)?.label || propertyType}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">{propertyAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-blue-500" />
                          <p>
                            {visitTypes.find(t => t.value === visitType)?.label || visitType}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Data e Horário</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-blue-500" />
                          <p>{date ? format(date, "PPP", { locale: ptBR }) : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <p>{time}</p>
                        </div>
                      </div>
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
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Continuar
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Confirmar Agendamento"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-green-600">Agendamento Confirmado!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <p className="text-lg">
                Sua visita foi agendada com sucesso para o dia{" "}
                <span className="font-medium">{date ? format(date, "PPP", { locale: ptBR }) : ""}</span> às{" "}
                <span className="font-medium">{time}</span>.
              </p>
              
              <p className="text-gray-500 dark:text-gray-400">
                Um de nossos corretores entrará em contato para confirmar os detalhes.
                Você também receberá um e-mail com a confirmação do agendamento.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()}>
              Fazer Novo Agendamento
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AgendamentoRealEstate;

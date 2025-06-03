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
import { CalendarIcon, Check, Clock, Utensils, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AgendamentoChefProps {
  onScheduleComplete: (data: any) => void;
}

const AgendamentoChef: React.FC<AgendamentoChefProps> = ({ onScheduleComplete }) => {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [menuType, setMenuType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const eventTypes = [
    { value: "wedding", label: "Casamento" },
    { value: "birthday", label: "Aniversário" },
    { value: "corporate", label: "Evento Corporativo" },
    { value: "graduation", label: "Formatura" },
    { value: "gathering", label: "Confraternização" }
  ];

  const guestCountOptions = [
    { value: "up_to_50", label: "Até 50 pessoas" },
    { value: "51_to_100", label: "51-100 pessoas" },
    { value: "101_to_200", label: "101-200 pessoas" },
    { value: "above_200", label: "Acima de 200 pessoas" }
  ];

  const menuTypes = [
    { value: "full_buffet", label: "Buffet Completo" },
    { value: "coffee_break", label: "Coffee Break" },
    { value: "cocktail", label: "Coquetel" },
    { value: "finger_food", label: "Finger Food" },
    { value: "dessert_table", label: "Mesa de Doces" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const dietaryRestrictionOptions = [
    { id: "vegetarian", label: "Vegetariano" },
    { id: "vegan", label: "Vegano" },
    { id: "gluten_free", label: "Sem Glúten" },
    { id: "lactose_free", label: "Sem Lactose" },
    { id: "nut_free", label: "Sem Nozes" }
  ];

  const paymentMethods = [
    { value: "credit_card", label: "Cartão de Crédito" },
    { value: "bank_transfer", label: "Transferência Bancária" },
    { value: "pix", label: "PIX" },
    { value: "cash", label: "Dinheiro" }
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const toggleDietaryRestriction = (restrictionId: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restrictionId) 
        ? prev.filter(id => id !== restrictionId) 
        : [...prev, restrictionId]
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
        eventType,
        eventAddress,
        guestCount,
        menuType,
        date: date ? format(date, 'dd/MM/yyyy') : '',
        time,
        dietaryRestrictions: dietaryRestrictions.map(id => 
          dietaryRestrictionOptions.find(option => option.id === id)?.label
        ),
        paymentMethod,
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
        return eventType !== "" && eventAddress !== "" && guestCount !== "" && menuType !== "";
      case 2:
        return date !== undefined && time !== "";
      case 3:
        return name !== "" && phone !== "" && email !== "" && paymentMethod !== "";
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <span className="text-sm mt-2">Evento</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <span className="text-sm mt-2">Data</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 3 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <span className="text-sm mt-2">Contato</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className={`h-1 w-full ${step >= 4 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                4
              </div>
              <span className="text-sm mt-2">Confirmação</span>
            </div>
          </div>

          {/* Step Content */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Detalhes do Evento"}
                {step === 2 && "Escolha a Data e Horário"}
                {step === 3 && "Seus Dados de Contato"}
                {step === 4 && "Confirme seu Agendamento"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Informe os detalhes do evento para o qual você precisa de serviço de buffet"}
                {step === 2 && "Selecione a data e horário do evento"}
                {step === 3 && "Preencha seus dados para que possamos entrar em contato"}
                {step === 4 && "Verifique se todas as informações estão corretas"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Tipo de Evento</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Selecione o tipo de evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventAddress">Local do Evento</Label>
                    <Input
                      id="eventAddress"
                      placeholder="Digite o endereço completo"
                      value={eventAddress}
                      onChange={(e) => setEventAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Número de Convidados</Label>
                    <Select value={guestCount} onValueChange={setGuestCount}>
                      <SelectTrigger id="guestCount">
                        <SelectValue placeholder="Selecione a quantidade de convidados" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestCountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="menuType">Tipo de Menu</Label>
                    <Select value={menuType} onValueChange={setMenuType}>
                      <SelectTrigger id="menuType">
                        <SelectValue placeholder="Selecione o tipo de menu" />
                      </SelectTrigger>
                      <SelectContent>
                        {menuTypes.map((type) => (
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
                    <Label>Data do Evento</Label>
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
                    <Label htmlFor="time">Horário do Evento</Label>
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
                    <Label>Restrições Alimentares (opcional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                      {dietaryRestrictionOptions.map((restriction) => (
                        <div key={restriction.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={restriction.id} 
                            checked={dietaryRestrictions.includes(restriction.id)}
                            onCheckedChange={() => toggleDietaryRestriction(restriction.id)}
                          />
                          <Label htmlFor={restriction.id} className="cursor-pointer">
                            {restriction.label}
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
                    <Label>Forma de Pagamento</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {paymentMethods.map((method) => (
                        <div key={method.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={method.value} id={method.value} />
                          <Label htmlFor={method.value}>{method.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Informações adicionais sobre o evento ou menu"
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
                      <h3 className="font-medium text-lg mb-2">Detalhes do Evento</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-start gap-2">
                          <Utensils className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div>
                            <p className="font-medium">
                              {eventTypes.find(t => t.value === eventType)?.label || eventType}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">{eventAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-500" />
                          <p>
                            {guestCountOptions.find(g => g.value === guestCount)?.label || guestCount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-orange-500" />
                          <p>
                            Menu: {menuTypes.find(m => m.value === menuType)?.label || menuType}
                          </p>
                        </div>
                      </div>
                      
                      {dietaryRestrictions.length > 0 && (
                        <div className="mt-3">
                          <p className="font-medium mb-1">Restrições Alimentares:</p>
                          <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                            {dietaryRestrictions.map(restrictionId => (
                              <li key={restrictionId}>
                                {dietaryRestrictionOptions.find(option => option.id === restrictionId)?.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Data e Horário</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-orange-500" />
                          <p>{date ? format(date, "PPP", { locale: ptBR }) : ""}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-500" />
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
                        <p><span className="font-medium">Pagamento:</span> {paymentMethods.find(m => m.value === paymentMethod)?.label || paymentMethod}</p>
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
                <Button onClick={handleNext} disabled={!isStepValid()} className="bg-orange-600 hover:bg-orange-700">
                  Continuar
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Enviando..." : "Confirmar Agendamento"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-orange-600">Agendamento Confirmado!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-orange-600" />
              </div>
              
              <p className="text-lg">
                Seu evento foi agendado com sucesso para o dia{" "}
                <span className="font-medium">{date ? format(date, "PPP", { locale: ptBR }) : ""}</span> às{" "}
                <span className="font-medium">{time}</span>.
              </p>
              
              <p className="text-gray-500 dark:text-gray-400">
                Um de nossos consultores entrará em contato para discutir os detalhes do menu e confirmar o orçamento.
                Você também receberá um e-mail com a confirmação do agendamento.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()} className="bg-orange-600 hover:bg-orange-700">
              Fazer Novo Agendamento
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AgendamentoChef;

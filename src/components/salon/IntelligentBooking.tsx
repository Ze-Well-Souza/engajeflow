import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSalonAvailability } from "@/hooks/useSalonAvailability";
import { useSalonServices } from "@/hooks/useSalonServices";
import { useSalonProfessionals } from "@/hooks/useSalonProfessionals";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CalendarIcon, Clock, User, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const IntelligentBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProfessional, setSelectedProfessional] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    professional_id: string;
    professional_name: string;
    start_time: string;
    end_time: string;
  } | null>(null);
  
  const { toast } = useToast();
  const { services, isLoading: servicesLoading } = useSalonServices(DEMO_CLIENT_ID);
  const { professionals, isLoading: professionalsLoading } = useSalonProfessionals(DEMO_CLIENT_ID);
  const { 
    availableSlots, 
    isLoading: availabilityLoading, 
    checkAvailability 
  } = useSalonAvailability(DEMO_CLIENT_ID);
  
  // Efeito para verificar disponibilidade quando serviço e data são selecionados
  useEffect(() => {
    if (selectedService && selectedDate) {
      checkAvailability(
        selectedService, 
        selectedDate, 
        selectedProfessional || undefined
      );
    }
  }, [selectedService, selectedDate, selectedProfessional]);
  
  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    setSelectedTimeSlot(null);
    setBookingStep(1);
  };
  
  const handleProfessionalChange = (value: string) => {
    setSelectedProfessional(value);
    setSelectedTimeSlot(null);
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  
  const handleTimeSlotSelect = (slot: {
    professional_id: string;
    professional_name: string;
    available_start_time: string;
    available_end_time: string;
  }) => {
    setSelectedTimeSlot({
      professional_id: slot.professional_id,
      professional_name: slot.professional_name,
      start_time: slot.available_start_time,
      end_time: slot.available_end_time
    });
    setBookingStep(2);
  };
  
  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !customerPhone) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e telefone são obrigatórios para o agendamento.",
        variant: "destructive"
      });
      return;
    }
    
    // Aqui seria feita a chamada para criar o agendamento no banco de dados
    // Por enquanto, apenas simulamos o sucesso
    toast({
      title: "Agendamento realizado",
      description: "Seu horário foi agendado com sucesso!",
    });
    
    // Reset do formulário
    setSelectedService("");
    setSelectedProfessional("");
    setSelectedDate(new Date());
    setSelectedTimeSlot(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setBookingStep(1);
  };
  
  const getSelectedServiceDetails = () => {
    return services.find(service => service.id === selectedService);
  };
  
  const formatTimeSlot = (startTime: string, endTime: string) => {
    return `${startTime.substring(0, 5)} - ${endTime.substring(0, 5)}`;
  };
  
  const isLoading = servicesLoading || professionalsLoading;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agendamento Inteligente</CardTitle>
        <CardDescription>
          Agende serviços com base na disponibilidade real dos profissionais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="booking" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="booking">Novo Agendamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="booking">
            {bookingStep === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Selecione o serviço e horário</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Serviço</label>
                        <Select
                          value={selectedService}
                          onValueChange={handleServiceChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map(service => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} ({service.duration_minutes} min)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Profissional (opcional)</label>
                        <Select
                          value={selectedProfessional}
                          onValueChange={handleProfessionalChange}
                          disabled={isLoading || !selectedService}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Qualquer profissional" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Qualquer profissional</SelectItem>
                            {professionals.map(professional => (
                              <SelectItem key={professional.id} value={professional.id}>
                                {professional.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Data</label>
                        <div className="border rounded-md p-3">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            disabled={isLoading || !selectedService}
                            locale={ptBR}
                            fromDate={new Date()}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Horários Disponíveis</label>
                        
                        {!selectedService ? (
                          <div className="border rounded-md p-4 text-center">
                            <p className="text-muted-foreground">
                              Selecione um serviço para ver os horários disponíveis
                            </p>
                          </div>
                        ) : availabilityLoading ? (
                          <div className="border rounded-md p-8 flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        ) : availableSlots.length === 0 ? (
                          <div className="border rounded-md p-4 text-center">
                            <p className="text-muted-foreground">
                              Não há horários disponíveis para esta data
                            </p>
                            <Button 
                              variant="outline" 
                              className="mt-2"
                              onClick={() => setSelectedDate(new Date(selectedDate!.getTime() + 86400000))}
                            >
                              Ver próximo dia
                            </Button>
                          </div>
                        ) : (
                          <div className="border rounded-md p-4 max-h-[400px] overflow-y-auto">
                            <div className="space-y-2">
                              {availableSlots.map((slot, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  className="w-full justify-between"
                                  onClick={() => handleTimeSlotSelect(slot)}
                                >
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{formatTimeSlot(slot.available_start_time, slot.available_end_time)}</span>
                                  </div>
                                  <div className="flex items-center text-muted-foreground text-sm">
                                    <User className="h-3 w-3 mr-1" />
                                    <span>{slot.professional_name}</span>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {selectedTimeSlot && (
                        <div className="border rounded-md p-4 bg-primary/5">
                          <h4 className="font-medium mb-2">Resumo da seleção</h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Serviço:</span>{" "}
                              {getSelectedServiceDetails()?.name}
                            </p>
                            <p>
                              <span className="font-medium">Data:</span>{" "}
                              {format(selectedDate!, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </p>
                            <p>
                              <span className="font-medium">Horário:</span>{" "}
                              {formatTimeSlot(selectedTimeSlot.start_time, selectedTimeSlot.end_time)}
                            </p>
                            <p>
                              <span className="font-medium">Profissional:</span>{" "}
                              {selectedTimeSlot.professional_name}
                            </p>
                          </div>
                          <Button 
                            className="w-full mt-4"
                            onClick={() => setBookingStep(2)}
                          >
                            Continuar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Informações do cliente</h3>
                  
                  <div className="border rounded-md p-4 bg-primary/5 mb-4">
                    <h4 className="font-medium mb-2">Resumo do agendamento</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Serviço:</span>{" "}
                        {getSelectedServiceDetails()?.name}
                      </p>
                      <p>
                        <span className="font-medium">Data:</span>{" "}
                        {format(selectedDate!, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                      <p>
                        <span className="font-medium">Horário:</span>{" "}
                        {formatTimeSlot(selectedTimeSlot!.start_time, selectedTimeSlot!.end_time)}
                      </p>
                      <p>
                        <span className="font-medium">Profissional:</span>{" "}
                        {selectedTimeSlot!.professional_name}
                      </p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome completo *</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Telefone *</label>
                      <input
                        type="tel"
                        className="w-full p-2 border rounded-md"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setBookingStep(1)}
                      >
                        Voltar
                      </Button>
                      <Button type="submit">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirmar Agendamento
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IntelligentBooking;

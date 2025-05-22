import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Clock, PartyPopper, Users, Music, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface GerenciamentoEventosProps {
  onActionComplete: (data: any) => void;
}

const GerenciamentoEventos: React.FC<GerenciamentoEventosProps> = ({ onActionComplete }) => {
  const [activeTab, setActiveTab] = useState("eventos");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventServices, setEventServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Dados simulados para eventos
  const events = [
    {
      id: "1",
      name: "Casamento Silva & Oliveira",
      type: "Casamento",
      date: "2025-06-15",
      time: "19:00",
      location: "Espaço Villa Garden",
      capacity: "150 convidados",
      status: "confirmed",
      services: ["Decoração", "Buffet", "DJ", "Fotografia"],
      description: "Cerimônia e recepção completa com decoração em tons de azul e branco.",
      client: {
        name: "Carlos Silva",
        phone: "(11) 98765-4321",
        email: "carlos.silva@email.com"
      },
      payments: [
        { date: "2025-03-10", amount: "5.000,00", status: "paid" },
        { date: "2025-05-10", amount: "5.000,00", status: "pending" },
        { date: "2025-06-10", amount: "5.000,00", status: "pending" }
      ],
      totalValue: "15.000,00"
    },
    {
      id: "2",
      name: "Aniversário 15 Anos - Maria Santos",
      type: "Aniversário",
      date: "2025-07-22",
      time: "20:00",
      location: "Buffet Estrela",
      capacity: "80 convidados",
      status: "confirmed",
      services: ["Decoração", "Buffet", "DJ", "Fotografia", "Cerimonial"],
      description: "Festa de 15 anos com tema Paris, decoração em rosa e dourado.",
      client: {
        name: "Roberto Santos",
        phone: "(11) 91234-5678",
        email: "roberto.santos@email.com"
      },
      payments: [
        { date: "2025-04-22", amount: "4.000,00", status: "paid" },
        { date: "2025-06-22", amount: "4.000,00", status: "pending" }
      ],
      totalValue: "8.000,00"
    },
    {
      id: "3",
      name: "Confraternização Empresa ABC",
      type: "Corporativo",
      date: "2025-12-18",
      time: "19:30",
      location: "Hotel Continental",
      capacity: "120 convidados",
      status: "pending",
      services: ["Buffet", "DJ", "Decoração"],
      description: "Confraternização de final de ano com jantar e música ao vivo.",
      client: {
        name: "Juliana Mendes",
        phone: "(11) 97777-8888",
        email: "juliana.mendes@empresaabc.com"
      },
      payments: [
        { date: "2025-10-18", amount: "6.000,00", status: "pending" },
        { date: "2025-12-10", amount: "6.000,00", status: "pending" }
      ],
      totalValue: "12.000,00"
    }
  ];

  // Dados simulados para fornecedores
  const suppliers = [
    {
      id: "1",
      name: "Buffet Delícias Gourmet",
      category: "Buffet",
      contact: "(11) 3333-4444",
      email: "contato@deliciasgourmet.com",
      rating: 4.8,
      events: 24
    },
    {
      id: "2",
      name: "DJ Master Sound",
      category: "DJ",
      contact: "(11) 5555-6666",
      email: "contato@mastersound.com",
      rating: 4.9,
      events: 36
    },
    {
      id: "3",
      name: "Flores & Decorações",
      category: "Decoração",
      contact: "(11) 7777-8888",
      email: "contato@floresedeco.com",
      rating: 4.7,
      events: 42
    },
    {
      id: "4",
      name: "Click Fotografia",
      category: "Fotografia",
      contact: "(11) 9999-0000",
      email: "contato@clickfotografia.com",
      rating: 4.6,
      events: 31
    }
  ];

  // Dados simulados para agenda
  const calendar = [
    {
      date: "2025-05-25",
      events: [
        { id: "4", name: "Reunião com Cliente", time: "10:00", type: "meeting" },
        { id: "5", name: "Visita Técnica - Espaço Villa Garden", time: "14:00", type: "visit" }
      ]
    },
    {
      date: "2025-06-15",
      events: [
        { id: "1", name: "Casamento Silva & Oliveira", time: "19:00", type: "event" }
      ]
    },
    {
      date: "2025-07-22",
      events: [
        { id: "2", name: "Aniversário 15 Anos - Maria Santos", time: "20:00", type: "event" }
      ]
    },
    {
      date: "2025-12-18",
      events: [
        { id: "3", name: "Confraternização Empresa ABC", time: "19:30", type: "event" }
      ]
    }
  ];

  const eventTypes = [
    { value: "wedding", label: "Casamento" },
    { value: "birthday", label: "Aniversário" },
    { value: "corporate", label: "Evento Corporativo" },
    { value: "graduation", label: "Formatura" },
    { value: "other", label: "Outro" }
  ];

  const capacityOptions = [
    { value: "up_to_50", label: "Até 50 convidados" },
    { value: "51_to_100", label: "51-100 convidados" },
    { value: "101_to_200", label: "101-200 convidados" },
    { value: "above_200", label: "Acima de 200 convidados" }
  ];

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00", "22:00"
  ];

  const serviceOptions = [
    { id: "decoration", label: "Decoração" },
    { id: "buffet", label: "Buffet" },
    { id: "dj", label: "DJ" },
    { id: "photography", label: "Fotografia" },
    { id: "ceremony", label: "Cerimonial" },
    { id: "lighting", label: "Iluminação" },
    { id: "transportation", label: "Transporte" }
  ];

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const toggleService = (serviceId: string) => {
    setEventServices(prev => 
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
      const eventData = {
        name: eventName,
        type: eventTypes.find(t => t.value === eventType)?.label || eventType,
        date: eventDate ? format(eventDate, 'dd/MM/yyyy') : '',
        time: eventTime,
        location: eventLocation,
        capacity: capacityOptions.find(c => c.value === eventCapacity)?.label || eventCapacity,
        services: eventServices.map(id => 
          serviceOptions.find(option => option.id === id)?.label
        ),
        description: eventDescription,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      onActionComplete(eventData);
    }, 1500);
  };

  const isFormValid = () => {
    return (
      eventName !== "" && 
      eventType !== "" && 
      eventDate !== undefined && 
      eventTime !== "" && 
      eventLocation !== "" && 
      eventCapacity !== ""
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
        </TabsList>
        
        {/* Eventos */}
        <TabsContent value="eventos">
          {!isCreatingEvent ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gerenciamento de Eventos</CardTitle>
                    <CardDescription>
                      Organize e acompanhe todos os seus eventos
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsCreatingEvent(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <PartyPopper className="h-4 w-4 mr-2" />
                    Novo Evento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Eventos Confirmados</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {events.filter(event => event.status === "confirmed").map((event) => (
                      <Card 
                        key={event.id} 
                        className="cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{event.name}</h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span>{formatDate(event.date)} às {event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-600">Confirmado</Badge>
                              <p className="text-sm mt-1">{event.capacity}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            {event.services.slice(0, 3).map((service, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {event.services.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{event.services.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <h3 className="text-lg font-medium">Eventos Pendentes</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {events.filter(event => event.status === "pending").map((event) => (
                      <Card 
                        key={event.id} 
                        className="cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{event.name}</h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span>{formatDate(event.date)} às {event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-yellow-600">Pendente</Badge>
                              <p className="text-sm mt-1">{event.capacity}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            {event.services.slice(0, 3).map((service, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {event.services.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{event.services.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : !isComplete ? (
            <Card>
              <CardHeader>
                <CardTitle>Novo Evento</CardTitle>
                <CardDescription>
                  Preencha os detalhes para cadastrar um novo evento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Nome do Evento</Label>
                    <Input
                      id="eventName"
                      placeholder="Ex: Casamento Silva & Oliveira"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data do Evento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {eventDate ? format(eventDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={eventDate}
                          onSelect={setEventDate}
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
                    <Label htmlFor="eventTime">Horário do Evento</Label>
                    <Select value={eventTime} onValueChange={setEventTime}>
                      <SelectTrigger id="eventTime">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventLocation">Local do Evento</Label>
                    <Input
                      id="eventLocation"
                      placeholder="Ex: Espaço Villa Garden"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventCapacity">Capacidade</Label>
                    <Select value={eventCapacity} onValueChange={setEventCapacity}>
                      <SelectTrigger id="eventCapacity">
                        <SelectValue placeholder="Selecione a capacidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {capacityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventDescription">Descrição do Evento</Label>
                  <Textarea
                    id="eventDescription"
                    placeholder="Descreva os detalhes do evento"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Serviços Necessários</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                    {serviceOptions.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={service.id} 
                          checked={eventServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <Label htmlFor={service.id} className="cursor-pointer">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreatingEvent(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isFormValid() || isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? "Salvando..." : "Salvar Evento"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-purple-600">Evento Cadastrado!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-purple-600" />
                  </div>
                  
                  <p className="text-lg">
                    <span className="font-medium">{eventName}</span> foi cadastrado com sucesso!
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-left">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <PartyPopper className="h-5 w-5 text-purple-500" />
                        <p className="font-medium">{eventName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-purple-500" />
                        <p>{eventDate ? format(eventDate, "PPP", { locale: ptBR }) : ""} às {eventTime}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-purple-500" />
                        <p>{eventLocation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <p>{capacityOptions.find(c => c.value === eventCapacity)?.label || eventCapacity}</p>
                      </div>
                    </div>
                    
                    {eventServices.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium mb-1">Serviços:</p>
                        <div className="flex flex-wrap gap-1">
                          {eventServices.map(serviceId => {
                            const service = serviceOptions.find(option => option.id === serviceId);
                            return service ? (
                              <Badge key={serviceId} variant="secondary">
                                {service.label}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-400">
                    O evento foi cadastrado com status "Pendente". Você pode gerenciar os detalhes e confirmar o evento a qualquer momento.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => {
                  setIsCreatingEvent(false);
                  setIsComplete(false);
                  setEventName("");
                  setEventType("");
                  setEventDate(undefined);
                  setEventTime("");
                  setEventLocation("");
                  setEventCapacity("");
                  setEventDescription("");
                  setEventServices([]);
                }} className="bg-purple-600 hover:bg-purple-700">
                  Voltar para Eventos
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Fornecedores */}
        <TabsContent value="fornecedores">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fornecedores</CardTitle>
                  <CardDescription>
                    Gerencie sua rede de fornecedores para eventos
                  </CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Adicionar Fornecedor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Buscar fornecedores..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas Categorias</SelectItem>
                      <SelectItem value="buffet">Buffet</SelectItem>
                      <SelectItem value="dj">DJ</SelectItem>
                      <SelectItem value="decoration">Decoração</SelectItem>
                      <SelectItem value="photography">Fotografia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suppliers.map((supplier) => (
                    <Card key={supplier.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{supplier.name}</h4>
                            <Badge variant="outline" className="mt-1">
                              {supplier.category}
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(supplier.rating) 
                                    ? 'text-yellow-400' 
                                    : i < supplier.rating 
                                      ? 'text-yellow-400' 
                                      : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm font-medium">{supplier.rating}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">Contato:</span>
                            <span>{supplier.contact}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">E-mail:</span>
                            <span>{supplier.email}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">Eventos realizados:</span>
                            <span>{supplier.events}</span>
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">Ver Portfólio</Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Contratar</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Agenda */}
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Agenda de Eventos</CardTitle>
              <CardDescription>
                Visualize e gerencie sua agenda de eventos e compromissos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Maio 2025</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Mês
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Semana
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Dia
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {calendar.map((day) => (
                    <Card key={day.date}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          {formatDate(day.date)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          {day.events.map((event) => (
                            <div 
                              key={event.id} 
                              className={`p-3 rounded-md ${
                                event.type === 'event' 
                                  ? 'bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-600' 
                                  : event.type === 'meeting' 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600' 
                                    : 'bg-green-50 dark:bg-green-900/30 border-l-4 border-green-600'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{event.name}</p>
                                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                                <Badge variant="outline" className={`${
                                  event.type === 'event' 
                                    ? 'border-purple-600 text-purple-600' 
                                    : event.type === 'meeting' 
                                      ? 'border-blue-600 text-blue-600' 
                                      : 'border-green-600 text-green-600'
                                }`}>
                                  {event.type === 'event' 
                                    ? 'Evento' 
                                    : event.type === 'meeting' 
                                      ? 'Reunião' 
                                      : 'Visita'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para visualização de evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedEvent.name}</CardTitle>
                  <CardDescription>
                    {selectedEvent.type} • {formatDate(selectedEvent.date)} às {selectedEvent.time}
                  </CardDescription>
                </div>
                <Badge className={selectedEvent.status === "confirmed" ? "bg-green-600" : "bg-yellow-600"}>
                  {selectedEvent.status === "confirmed" ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Detalhes do Evento</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <p>{selectedEvent.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <p>{selectedEvent.capacity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-gray-500" />
                        <div className="flex flex-wrap gap-1">
                          {selectedEvent.services.map((service: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedEvent.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Cliente</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-1">
                      <p><span className="font-medium">Nome:</span> {selectedEvent.client.name}</p>
                      <p><span className="font-medium">Telefone:</span> {selectedEvent.client.phone}</p>
                      <p><span className="font-medium">E-mail:</span> {selectedEvent.client.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Pagamentos</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-2">
                      <div className="space-y-2">
                        {selectedEvent.payments.map((payment: any, i: number) => (
                          <div key={i} className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">{formatDate(payment.date)}</p>
                              <p className="text-xs text-gray-500">
                                {payment.status === "paid" ? "Pago" : "Pendente"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">R$ {payment.amount}</p>
                              <Badge variant="outline" className={
                                payment.status === "paid" 
                                  ? "border-green-600 text-green-600" 
                                  : "border-yellow-600 text-yellow-600"
                              }>
                                {payment.status === "paid" ? "Pago" : "Pendente"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <p className="font-medium">Total:</p>
                        <p className="font-medium">R$ {selectedEvent.totalValue}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Ações</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full">
                        Editar Evento
                      </Button>
                      {selectedEvent.status === "pending" ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Confirmar Evento
                        </Button>
                      ) : (
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Gerar Relatório
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        Enviar E-mail
                      </Button>
                      <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                        Cancelar Evento
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedEvent(null);
                  setIsDialogOpen(false);
                }}
              >
                Fechar
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GerenciamentoEventos;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ChefHat, Users } from "lucide-react";
import { toast } from "sonner";

interface AgendamentoChefProps {
  onScheduleComplete?: () => void;
}

const AgendamentoChef: React.FC<AgendamentoChefProps> = ({ onScheduleComplete }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    eventType: "",
    cuisine: "",
    guests: "",
    date: "",
    time: "",
    location: "",
    specialRequests: ""
  });

  const eventTypes = [
    { id: "jantar_intimo", name: "Jantar Íntimo", price: "R$ 300,00" },
    { id: "festa_aniversario", name: "Festa de Aniversário", price: "R$ 500,00" },
    { id: "evento_corporativo", name: "Evento Corporativo", price: "R$ 800,00" },
    { id: "casamento", name: "Casamento", price: "R$ 1.200,00" }
  ];

  const cuisines = [
    { id: "brasileira", name: "Culinária Brasileira" },
    { id: "italiana", name: "Culinária Italiana" },
    { id: "francesa", name: "Culinária Francesa" },
    { id: "japonesa", name: "Culinária Japonesa" },
    { id: "vegetariana", name: "Culinária Vegetariana" }
  ];

  const timeSlots = [
    "12:00", "13:00", "18:00", "19:00", "20:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.eventType || !formData.date || !formData.time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Agendamento com chef realizado com sucesso!");
    
    if (onScheduleComplete) {
      onScheduleComplete();
    }

    setFormData({
      clientName: "",
      clientPhone: "",
      eventType: "",
      cuisine: "",
      guests: "",
      date: "",
      time: "",
      location: "",
      specialRequests: ""
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-orange-500" />
          Agendamento de Chef Particular
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Nome do Cliente *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Digite o nome completo"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="clientPhone">Telefone</Label>
              <Input
                id="clientPhone"
                value={formData.clientPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="(11) 99999-9999"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventType">Tipo de Evento *</Label>
              <Select value={formData.eventType} onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o evento" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name} - a partir de {event.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cuisine">Tipo de Culinária</Label>
              <Select value={formData.cuisine} onValueChange={(value) => setFormData(prev => ({ ...prev, cuisine: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione a culinária" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="guests">Número de Convidados</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                placeholder="Ex: 10"
                className="mt-1"
                min="1"
              />
            </div>
            
            <div>
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Horário *</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Local do Evento</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Endereço completo"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="specialRequests">Pedidos Especiais</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
              placeholder="Alergias, preferências alimentares, menu específico..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Calendar className="h-4 w-4 mr-2" />
              Confirmar Agendamento
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgendamentoChef;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AgendamentoHousekeeperProps {
  onScheduleComplete?: () => void;
}

const AgendamentoHousekeeper: React.FC<AgendamentoHousekeeperProps> = ({ onScheduleComplete }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    serviceType: "",
    frequency: "",
    date: "",
    time: "",
    address: "",
    rooms: [] as string[],
    specialRequests: ""
  });

  const serviceTypes = [
    { id: "limpeza_residencial", name: "Limpeza Residencial", price: "R$ 80,00" },
    { id: "limpeza_apartamento", name: "Limpeza de Apartamento", price: "R$ 60,00" },
    { id: "limpeza_comercial", name: "Limpeza Comercial", price: "R$ 120,00" },
    { id: "limpeza_pos_festa", name: "Limpeza Pós-Festa", price: "R$ 150,00" }
  ];

  const frequencies = [
    { id: "unica", name: "Uma vez" },
    { id: "semanal", name: "Semanal" },
    { id: "quinzenal", name: "Quinzenal" },
    { id: "mensal", name: "Mensal" }
  ];

  const roomOptions = [
    { id: "sala", name: "Sala de Estar" },
    { id: "cozinha", name: "Cozinha" },
    { id: "banheiro", name: "Banheiro" },
    { id: "quarto", name: "Quartos" },
    { id: "varanda", name: "Varanda/Área Externa" },
    { id: "escritorio", name: "Escritório" }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "14:00", "15:00", "16:00"
  ];

  const handleRoomChange = (roomId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rooms: checked 
        ? [...prev.rooms, roomId]
        : prev.rooms.filter(id => id !== roomId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.serviceType || !formData.date || !formData.time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Agendamento de limpeza realizado com sucesso!");
    
    if (onScheduleComplete) {
      onScheduleComplete();
    }

    setFormData({
      clientName: "",
      clientPhone: "",
      serviceType: "",
      frequency: "",
      date: "",
      time: "",
      address: "",
      rooms: [],
      specialRequests: ""
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Agendamento de Serviços de Limpeza
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

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Rua, número, bairro, cidade"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="serviceType">Tipo de Serviço *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="frequency">Frequência</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.id} value={freq.id}>
                      {freq.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectValue placeholder="Selecione o horário" />
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
            <Label>Cômodos a serem limpos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {roomOptions.map((room) => (
                <div key={room.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={room.id}
                    checked={formData.rooms.includes(room.id)}
                    onCheckedChange={(checked) => handleRoomChange(room.id, checked as boolean)}
                  />
                  <Label htmlFor={room.id} className="text-sm">
                    {room.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="specialRequests">Observações Especiais</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
              placeholder="Instruções especiais, produtos específicos, animais de estimação..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Calendar className="h-4 w-4 mr-2" />
              Confirmar Agendamento
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgendamentoHousekeeper;

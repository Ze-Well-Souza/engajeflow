
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Scissors } from "lucide-react";
import { toast } from "sonner";

interface AgendamentoBeautySalonProps {
  onScheduleComplete?: () => void;
}

const AgendamentoBeautySalon: React.FC<AgendamentoBeautySalonProps> = ({ onScheduleComplete }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    service: "",
    professional: "",
    date: "",
    time: ""
  });

  const services = [
    { id: "1", name: "Corte de Cabelo", duration: "1h", price: "R$ 80,00" },
    { id: "2", name: "Coloração", duration: "2h", price: "R$ 150,00" },
    { id: "3", name: "Manicure", duration: "45min", price: "R$ 45,00" },
    { id: "4", name: "Pedicure", duration: "1h", price: "R$ 55,00" },
    { id: "5", name: "Sobrancelha", duration: "30min", price: "R$ 35,00" }
  ];

  const professionals = [
    { id: "1", name: "Ana Silva", specialty: "Cabelo" },
    { id: "2", name: "Marina Costa", specialty: "Unhas" },
    { id: "3", name: "Juliana Santos", specialty: "Estética" }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.service || !formData.date || !formData.time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    toast.success("Agendamento realizado com sucesso!");
    
    if (onScheduleComplete) {
      onScheduleComplete();
    }

    // Reset form
    setFormData({
      clientName: "",
      clientPhone: "",
      service: "",
      professional: "",
      date: "",
      time: ""
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-pink-500" />
          Agendamento de Serviços de Beleza
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
            <Label htmlFor="service">Serviço *</Label>
            <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.duration} - {service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="professional">Profissional</Label>
            <Select value={formData.professional} onValueChange={(value) => setFormData(prev => ({ ...prev, professional: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o profissional (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.name} - {prof.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700">
              <Calendar className="h-4 w-4 mr-2" />
              Confirmar Agendamento
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgendamentoBeautySalon;

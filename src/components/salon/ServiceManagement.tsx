import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSalonServices, SalonService } from "@/hooks/useSalonServices";
import { useSalonSpecialties } from "@/hooks/useSalonSpecialties";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, Save } from "lucide-react";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const ServiceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [editingService, setEditingService] = useState<SalonService | null>(null);
  
  // Estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [price, setPrice] = useState<string>("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  const { toast } = useToast();
  const { 
    services, 
    isLoading: servicesLoading, 
    addService, 
    updateService,
    deleteService 
  } = useSalonServices(DEMO_CLIENT_ID);
  
  const { 
    specialties, 
    isLoading: specialtiesLoading 
  } = useSalonSpecialties(DEMO_CLIENT_ID);
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setDurationMinutes(60);
    setPrice("");
    setSelectedSpecialties([]);
    setEditingService(null);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "new") {
      resetForm();
    }
  };
  
  const handleEditService = (service: SalonService) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description || "");
    setDurationMinutes(service.duration_minutes);
    setPrice(service.price ? service.price.toString() : "");
    setSelectedSpecialties(service.specialties || []);
    setActiveTab("new");
  };
  
  const handleDeleteService = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este serviço?")) {
      await deleteService(id);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erro",
        description: "O nome do serviço é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    if (durationMinutes <= 0) {
      toast({
        title: "Erro",
        description: "A duração deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }
    
    const priceValue = price ? parseFloat(price) : null;
    
    const serviceData = {
      name,
      description: description || null,
      duration_minutes: durationMinutes,
      price: priceValue,
      is_active: true,
      specialties: selectedSpecialties,
      client_id: DEMO_CLIENT_ID
    };
    
    let success;
    
    if (editingService) {
      success = await updateService(editingService.id, serviceData);
    } else {
      const result = await addService(serviceData);
      success = !!result;
    }
    
    if (success) {
      resetForm();
      setActiveTab("list");
    }
  };
  
  const handleSpecialtyChange = (specialtyId: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties(prev => [...prev, specialtyId]);
    } else {
      setSelectedSpecialties(prev => prev.filter(id => id !== specialtyId));
    }
  };
  
  const formatPrice = (price: number | null) => {
    if (price === null) return "Preço não definido";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return hours === 1 ? "1 hora" : `${hours} horas`;
      } else {
        return `${hours}h${remainingMinutes}min`;
      }
    }
  };
  
  const isLoading = servicesLoading || specialtiesLoading;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Serviços</CardTitle>
        <CardDescription>
          Cadastre e gerencie os serviços oferecidos pelo seu salão.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Serviços</TabsTrigger>
            <TabsTrigger value="new">
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <p className="text-muted-foreground mb-4">
                  Nenhum serviço cadastrado.
                </p>
                <Button onClick={() => setActiveTab("new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Serviço
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map(service => (
                  <Card key={service.id} className="overflow-hidden">
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{service.name}</h3>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {formatDuration(service.duration_minutes)}
                          </span>
                          {service.price !== null && (
                            <span className="text-sm bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                              {formatPrice(service.price)}
                            </span>
                          )}
                        </div>
                        
                        {service.description && (
                          <p className="text-sm mt-2">{service.description}</p>
                        )}
                        
                        {service.specialties && service.specialties.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Especialidades necessárias:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {service.specialties.map(specialtyId => {
                                const specialty = specialties.find(s => s.id === specialtyId);
                                return specialty ? (
                                  <span 
                                    key={specialtyId}
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                  >
                                    {specialty.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nome do serviço"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descrição do serviço"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (minutos) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(parseInt(e.target.value) || 0)}
                    placeholder="Duração em minutos"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Preço do serviço"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Especialidades Necessárias</Label>
                {specialtiesLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Carregando especialidades...
                    </span>
                  </div>
                ) : specialties.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhuma especialidade cadastrada.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {specialties.map(specialty => (
                      <div key={specialty.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`specialty-${specialty.id}`}
                          checked={selectedSpecialties.includes(specialty.id)}
                          onCheckedChange={(checked) => 
                            handleSpecialtyChange(specialty.id, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`specialty-${specialty.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {specialty.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setActiveTab("list");
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingService ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Serviço
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceManagement;

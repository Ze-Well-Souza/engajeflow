import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSalonProfessionals, Professional } from "@/hooks/useSalonProfessionals";
import { useSalonSpecialties, SalonSpecialty } from "@/hooks/useSalonSpecialties";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, Save } from "lucide-react";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const ProfessionalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  
  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  
  const { toast } = useToast();
  const { 
    professionals, 
    isLoading: professionalsLoading, 
    addProfessional, 
    updateProfessional,
    deleteProfessional 
  } = useSalonProfessionals(DEMO_CLIENT_ID);
  
  const { 
    specialties, 
    isLoading: specialtiesLoading 
  } = useSalonSpecialties(DEMO_CLIENT_ID);
  
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setBio("");
    setSelectedSpecialties([]);
    setEditingProfessional(null);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "new") {
      resetForm();
    }
  };
  
  const handleEditProfessional = (professional: Professional) => {
    setEditingProfessional(professional);
    setName(professional.name);
    setEmail(professional.email || "");
    setPhone(professional.phone || "");
    setBio(professional.bio || "");
    setSelectedSpecialties(professional.specialties || []);
    setActiveTab("new");
  };
  
  const handleDeleteProfessional = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este profissional?")) {
      await deleteProfessional(id);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erro",
        description: "O nome do profissional é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const professionalData = {
      name,
      email: email || null,
      phone: phone || null,
      bio: bio || null,
      is_active: true,
      specialties: selectedSpecialties,
      client_id: DEMO_CLIENT_ID
    };
    
    let success;
    
    if (editingProfessional) {
      success = await updateProfessional(editingProfessional.id, professionalData);
    } else {
      const result = await addProfessional(professionalData);
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
  
  const isLoading = professionalsLoading || specialtiesLoading;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Profissionais</CardTitle>
        <CardDescription>
          Cadastre e gerencie os profissionais do seu salão de beleza.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Profissionais</TabsTrigger>
            <TabsTrigger value="new">
              {editingProfessional ? "Editar Profissional" : "Novo Profissional"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : professionals.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <p className="text-muted-foreground mb-4">
                  Nenhum profissional cadastrado.
                </p>
                <Button onClick={() => setActiveTab("new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Profissional
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {professionals.map(professional => (
                  <Card key={professional.id} className="overflow-hidden">
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{professional.name}</h3>
                        {professional.email && (
                          <p className="text-sm text-muted-foreground">
                            Email: {professional.email}
                          </p>
                        )}
                        {professional.phone && (
                          <p className="text-sm text-muted-foreground">
                            Telefone: {professional.phone}
                          </p>
                        )}
                        {professional.bio && (
                          <p className="text-sm mt-2">{professional.bio}</p>
                        )}
                        
                        {professional.specialties && professional.specialties.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Especialidades:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {professional.specialties.map(specialtyId => {
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
                          onClick={() => handleEditProfessional(professional)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteProfessional(professional.id)}
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
                  placeholder="Nome do profissional"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email do profissional"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Telefone do profissional"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Breve descrição sobre o profissional"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Especialidades</Label>
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
                  {editingProfessional ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Profissional
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

export default ProfessionalManagement;

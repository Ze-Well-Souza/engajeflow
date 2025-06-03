import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSalonSpecialties, SalonSpecialty } from "@/hooks/useSalonSpecialties";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, Save } from "lucide-react";

// Cliente temporário fixo para demonstração
const DEMO_CLIENT_ID = "00000000-0000-0000-0000-000000000000";

const SpecialtyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("list");
  const [editingSpecialty, setEditingSpecialty] = useState<SalonSpecialty | null>(null);
  
  // Estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const { toast } = useToast();
  const { 
    specialties, 
    isLoading, 
    addSpecialty, 
    updateSpecialty,
    deleteSpecialty 
  } = useSalonSpecialties(DEMO_CLIENT_ID);
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingSpecialty(null);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "new") {
      resetForm();
    }
  };
  
  const handleEditSpecialty = (specialty: SalonSpecialty) => {
    setEditingSpecialty(specialty);
    setName(specialty.name);
    setDescription(specialty.description || "");
    setActiveTab("new");
  };
  
  const handleDeleteSpecialty = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta especialidade?")) {
      await deleteSpecialty(id);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Erro",
        description: "O nome da especialidade é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const specialtyData = {
      name,
      description: description || null
    };
    
    let success;
    
    if (editingSpecialty) {
      success = await updateSpecialty(editingSpecialty.id, specialtyData);
    } else {
      const result = await addSpecialty(specialtyData);
      success = !!result;
    }
    
    if (success) {
      resetForm();
      setActiveTab("list");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciamento de Especialidades</CardTitle>
        <CardDescription>
          Cadastre e gerencie as especialidades disponíveis no seu salão.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">Lista de Especialidades</TabsTrigger>
            <TabsTrigger value="new">
              {editingSpecialty ? "Editar Especialidade" : "Nova Especialidade"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : specialties.length === 0 ? (
              <div className="text-center py-8 border rounded-md">
                <p className="text-muted-foreground mb-4">
                  Nenhuma especialidade cadastrada.
                </p>
                <Button onClick={() => setActiveTab("new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Especialidade
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {specialties.map(specialty => (
                  <Card key={specialty.id} className="overflow-hidden">
                    <div className="p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{specialty.name}</h3>
                        {specialty.description && (
                          <p className="text-sm mt-2">{specialty.description}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditSpecialty(specialty)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteSpecialty(specialty.id)}
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
                  placeholder="Nome da especialidade"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descrição da especialidade"
                  rows={3}
                />
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
                  {editingSpecialty ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Especialidade
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

export default SpecialtyManagement;

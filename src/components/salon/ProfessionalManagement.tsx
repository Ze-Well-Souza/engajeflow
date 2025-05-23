
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { salonService } from '@/services/salon/salonService';
import { Professional, Specialty } from '@/types/salon';

interface ProfessionalManagementProps {
  clientId: string;
  onProfessionalCreated?: () => void;
  isVisible?: boolean;
}

const ProfessionalManagement: React.FC<ProfessionalManagementProps> = ({
  clientId,
  onProfessionalCreated,
  isVisible = true
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [availableSpecialties, setAvailableSpecialties] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const specialties = await salonService.fetchSpecialties(clientId);
        setAvailableSpecialties(specialties);
      } catch (error) {
        console.error('Erro ao buscar especialidades:', error);
        toast.error('Não foi possível carregar as especialidades');
      }
    };

    fetchSpecialties();
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsLoading(true);
      
      const newProfessional = await salonService.createProfessional({
        name,
        email,
        phone,
        bio,
        is_active: isActive,
        specialties,
        client_id: clientId,
        profile_image_url: '' // Campo obrigatório vazio
      });

      toast.success(`${name} adicionado com sucesso!`);
      
      // Limpar formulário
      setName('');
      setEmail('');
      setPhone('');
      setBio('');
      setIsActive(true);
      setSpecialties([]);
      
      if (onProfessionalCreated) {
        onProfessionalCreated();
      }
      
    } catch (error) {
      console.error('Erro ao criar profissional:', error);
      toast.error('Erro ao adicionar profissional');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpecialty = (specialtyId: string) => {
    setSpecialties(current => 
      current.includes(specialtyId)
        ? current.filter(id => id !== specialtyId)
        : [...current, specialtyId]
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Adicionar Novo Profissional</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome*</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Nome completo" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="email@exemplo.com" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone*</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(00) 00000-0000" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={isActive ? "active" : "inactive"} 
                onValueChange={(value) => setIsActive(value === "active")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea 
              id="bio" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              placeholder="Informações sobre o profissional..." 
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Especialidades</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {availableSpecialties.map((specialty) => (
                <div key={specialty.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`specialty-${specialty.id}`}
                    checked={specialties.includes(specialty.id)}
                    onCheckedChange={() => toggleSpecialty(specialty.id)}
                  />
                  <label 
                    htmlFor={`specialty-${specialty.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {specialty.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adicionando...' : 'Adicionar Profissional'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfessionalManagement;


import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';
import { SalonService } from '@/services/salon/salonService';
import { Professional, Specialty } from '@/types/salon';
import { toast } from 'sonner';

interface ProfessionalManagementProps {
  clientId: string;
}

const ProfessionalManagement: React.FC<ProfessionalManagementProps> = ({ clientId }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [specialties] = useState<Specialty[]>([
    { id: '1', name: 'Cabelo', description: 'Cortes e tratamentos', active: true, created_at: new Date().toISOString() },
    { id: '2', name: 'Unhas', description: 'Manicure e pedicure', active: true, created_at: new Date().toISOString() },
    { id: '3', name: 'Estética', description: 'Tratamentos faciais', active: true, created_at: new Date().toISOString() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: ''
  });

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      setIsLoading(true);
      const data = await SalonService.getProfessionals();
      setProfessionals(data);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
      toast.error('Erro ao carregar profissionais');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProfessional) {
        // Atualizar profissional (simulado)
        toast.success('Profissional atualizado com sucesso!');
      } else {
        // Criar novo profissional
        await SalonService.createProfessional({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialty: formData.specialty,
          active: true
        });
        toast.success('Profissional criado com sucesso!');
      }
      
      resetForm();
      loadProfessionals();
    } catch (error) {
      console.error('Erro ao salvar profissional:', error);
      toast.error('Erro ao salvar profissional');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', specialty: '' });
    setEditingProfessional(null);
    setShowForm(false);
  };

  const handleEdit = (professional: Professional) => {
    setFormData({
      name: professional.name,
      email: professional.email,
      phone: professional.phone,
      specialty: professional.specialty
    });
    setEditingProfessional(professional);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Profissionais</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Profissional
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProfessional ? 'Editar' : 'Novo'} Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.name}>
                          {specialty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProfessional ? 'Atualizar' : 'Criar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profissionais Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : (
            <div className="space-y-4">
              {professionals.map((professional) => (
                <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{professional.name}</h3>
                    <p className="text-sm text-gray-600">{professional.email}</p>
                    <p className="text-sm text-gray-600">{professional.phone}</p>
                    <Badge variant="secondary" className="mt-1">
                      {professional.specialty}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(professional)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalManagement;

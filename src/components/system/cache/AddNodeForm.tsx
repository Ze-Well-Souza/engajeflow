
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { distributedCache } from '@/services/DistributedCacheService';

interface AddNodeFormProps {
  onNodeAdded: () => void;
}

const AddNodeForm: React.FC<AddNodeFormProps> = ({ onNodeAdded }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: `node-${Date.now()}`,
    name: '',
    url: '',
    priority: 2
  });

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      distributedCache.addNode({
        id: formData.id,
        name: formData.name,
        url: formData.url,
        status: 'active',
        priority: formData.priority
      });
      toast({
        title: "Nó adicionado",
        description: `O nó ${formData.name} foi adicionado ao cluster`,
        variant: "default"
      });
      setFormData({
        id: `node-${Date.now()}`,
        name: '',
        url: '',
        priority: 2
      });
      onNodeAdded();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o nó",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Adicionar Novo Nó</CardTitle>
        <CardDescription>
          Inclua um novo servidor no cluster de cache distribuído
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddNode} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="node-id">ID do Nó</Label>
            <Input 
              id="node-id" 
              placeholder="ID único do nó" 
              value={formData.id}
              onChange={e => setFormData({...formData, id: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="node-name">Nome</Label>
            <Input 
              id="node-name" 
              placeholder="Nome amigável do nó" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="node-url">URL</Label>
            <Input 
              id="node-url" 
              placeholder="Endereço do servidor" 
              value={formData.url}
              onChange={e => setFormData({...formData, url: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="node-priority">Prioridade</Label>
            <Select 
              value={formData.priority.toString()} 
              onValueChange={val => setFormData({...formData, priority: parseInt(val)})}
            >
              <SelectTrigger id="node-priority">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Alta</SelectItem>
                <SelectItem value="2">2 - Média</SelectItem>
                <SelectItem value="3">3 - Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit">Adicionar Nó</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNodeForm;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { distributedCache } from '@/services/DistributedCacheService';

interface AddCacheFormProps {
  onItemAdded: () => void;
}

const AddCacheForm: React.FC<AddCacheFormProps> = ({ onItemAdded }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    ttl: 300,
    region: 'default',
    tags: ''
  });

  const handleAddToCache = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { key, value, ttl, region, tags } = formData;
      distributedCache.set(key, value, {
        ttl: Number(ttl),
        region,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined
      });
      toast({
        title: "Item adicionado",
        description: `Item "${key}" adicionado ao cache`,
        variant: "default"
      });
      setFormData({
        key: '',
        value: '',
        ttl: 300,
        region: 'default',
        tags: ''
      });
      onItemAdded();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao cache",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar ao Cache</CardTitle>
        <CardDescription>
          Adicione novos itens ao cache distribuído
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddToCache} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cache-key">Chave</Label>
            <Input 
              id="cache-key" 
              placeholder="Nome da chave" 
              value={formData.key}
              onChange={e => setFormData({...formData, key: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cache-value">Valor</Label>
            <Input 
              id="cache-value" 
              placeholder="Valor a ser armazenado" 
              value={formData.value}
              onChange={e => setFormData({...formData, value: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cache-ttl">Tempo de vida (segundos)</Label>
            <Input 
              id="cache-ttl" 
              type="number" 
              min="1"
              value={formData.ttl}
              onChange={e => setFormData({...formData, ttl: parseInt(e.target.value)})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cache-region">Região</Label>
            <Input 
              id="cache-region" 
              placeholder="Região do cache" 
              value={formData.region}
              onChange={e => setFormData({...formData, region: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cache-tags">Tags (separadas por vírgula)</Label>
            <Input 
              id="cache-tags" 
              placeholder="ex: produto, destaque, novo" 
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <Button type="submit" className="w-full">Adicionar ao Cache</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCacheForm;

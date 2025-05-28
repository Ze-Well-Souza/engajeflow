
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import GoogleAIContentGenerator from "@/components/ai/GoogleAIContentGenerator";
import useScheduledPosts from "@/hooks/useScheduledPosts";
import { useClients } from "@/hooks/useClients";

interface NovoAgendamentoProps {
  onClose: () => void;
}

const NovoAgendamento: React.FC<NovoAgendamentoProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    caption: '',
    scheduled_for: '',
    client_id: ''
  });
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const { createScheduledPost } = useScheduledPosts();
  const { clients } = useClients();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !hashtags.includes(newHashtag.trim())) {
      const formattedHashtag = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`;
      setHashtags(prev => [...prev, formattedHashtag.trim()]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIContentGenerated = (content: string, generatedHashtags: string[], bestTime: string) => {
    setFormData(prev => ({ ...prev, caption: content }));
    setHashtags(generatedHashtags);
    setSelectedTime(bestTime);
    setShowAIGenerator(false);
    toast.success('Conteúdo da IA aplicado!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Selecione uma data');
      return;
    }

    // Combinar data e hora
    const scheduledDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

    const result = await createScheduledPost({
      ...formData,
      scheduled_for: scheduledDateTime.toISOString(),
      hashtags
    });

    if (result.success) {
      toast.success('Agendamento criado com sucesso!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Novo Agendamento</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gerador de IA */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Gerar Conteúdo com IA</h3>
              <Button
                variant="outline"
                onClick={() => setShowAIGenerator(!showAIGenerator)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {showAIGenerator ? 'Ocultar IA' : 'Usar IA'}
              </Button>
            </div>
            
            {showAIGenerator && (
              <GoogleAIContentGenerator onContentGenerated={handleAIContentGenerated} />
            )}
          </div>

          {/* Formulário Principal */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Plataforma</label>
                <Select 
                  value={formData.platform} 
                  onValueChange={(value) => handleInputChange('platform', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {clients.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Cliente</label>
                  <Select 
                    value={formData.client_id} 
                    onValueChange={(value) => handleInputChange('client_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Conteúdo da Postagem</label>
              <Textarea
                placeholder="Digite o conteúdo da sua postagem..."
                value={formData.caption}
                onChange={(e) => handleInputChange('caption', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Hashtags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Digite uma hashtag"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                />
                <Button type="button" onClick={addHashtag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer">
                    {hashtag}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeHashtag(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Data do Agendamento
                </label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Horário</label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Criar Agendamento
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoAgendamento;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { useClients } from '@/hooks/useClients';
import { toast } from 'sonner';
import GoogleAIContentGenerator from '@/components/ai/GoogleAIContentGenerator';

interface NovoAgendamentoProps {
  onSuccess?: () => void;
}

const NovoAgendamento: React.FC<NovoAgendamentoProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    caption: '',
    scheduledDate: undefined as Date | undefined,
    scheduledTime: '12:00',
    clientId: ''
  });
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createScheduledPost } = useScheduledPosts();
  const { clients } = useClients();

  const handleContentGenerated = (content: string, generatedHashtags: string[], bestTime: string) => {
    setFormData(prev => ({
      ...prev,
      caption: content,
      scheduledTime: bestTime
    }));
    setHashtags(generatedHashtags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.scheduledDate) {
      toast.error('Por favor, selecione uma data para o agendamento');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const scheduledDateTime = new Date(formData.scheduledDate);
      const [hours, minutes] = formData.scheduledTime.split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

      const result = await createScheduledPost({
        platform: formData.platform,
        caption: formData.caption,
        scheduled_for: scheduledDateTime.toISOString(),
        hashtags,
        client_id: formData.clientId || undefined
      });

      if (result.success) {
        toast.success('Post agendado com sucesso!');
        setFormData({
          platform: 'instagram',
          caption: '',
          scheduledDate: undefined,
          scheduledTime: '12:00',
          clientId: ''
        });
        setHashtags([]);
        onSuccess?.();
      }
    } catch (error) {
      toast.error('Erro ao agendar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <GoogleAIContentGenerator onContentGenerated={handleContentGenerated} />
      
      <Card>
        <CardHeader>
          <CardTitle>Agendar Nova Publicação</CardTitle>
          <CardDescription>
            Configure os detalhes da sua publicação agendada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Plataforma</label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cliente (Opcional)</label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Conteúdo da Publicação</label>
              <Textarea
                placeholder="Digite o conteúdo da sua publicação..."
                value={formData.caption}
                onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Data do Agendamento</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !formData.scheduledDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.scheduledDate ? (
                        format(formData.scheduledDate, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.scheduledDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, scheduledDate: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Horário</label>
                <Input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            {hashtags.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Hashtags Sugeridas</label>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agendando...
                </>
              ) : (
                'Agendar Publicação'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoAgendamento;

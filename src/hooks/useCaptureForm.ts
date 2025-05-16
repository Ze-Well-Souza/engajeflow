
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Esquema de validação para o formulário de captura
const captureFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  interesse: z.string().min(1, { message: 'Selecione um interesse' }),
  origem: z.string().optional(),
  consentimento: z.boolean().refine(val => val === true, {
    message: 'Você precisa concordar com os termos',
  }),
});

export type CaptureFormValues = z.infer<typeof captureFormSchema>;

export function useCaptureForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CaptureFormValues>({
    resolver: zodResolver(captureFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interesse: '',
      origem: '',
      consentimento: false,
    },
  });

  const handleSubmit = async (values: CaptureFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Em uma implementação real, aqui você enviaria os dados para sua API
      console.log('Dados de captura enviados:', values);
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Lead capturado com sucesso!",
        description: `${values.name} foi adicionado à sua base de leads.`,
      });
      
      // Resetar o formulário após envio bem-sucedido
      form.reset();
      
      return true;
    } catch (error) {
      console.error('Erro ao capturar lead:', error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}

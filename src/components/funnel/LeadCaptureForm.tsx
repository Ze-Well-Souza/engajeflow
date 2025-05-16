
import React from 'react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CaptureFormValues, useCaptureForm } from "@/hooks/useCaptureForm";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  onSuccess?: (data: CaptureFormValues) => void;
  origem?: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  title = "Receba conteúdo exclusivo",
  description = "Preencha o formulário abaixo para receber nossas dicas e promoções especiais.",
  imageSrc,
  onSuccess,
  origem = "website"
}) => {
  const { form, isSubmitting, handleSubmit } = useCaptureForm();

  const onSubmitSuccess = (data: CaptureFormValues) => {
    if (onSuccess) {
      onSuccess(data);
    }
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {imageSrc && (
        <div className="px-6">
          <img 
            src={imageSrc} 
            alt="Imagem de destaque" 
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        </div>
      )}

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            // Adicionamos a origem automaticamente
            const enrichedData = { ...data, origem };
            handleSubmit(enrichedData).then(success => {
              if (success) onSubmitSuccess(enrichedData);
            });
          })} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="interesse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual seu principal interesse?</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="produtos">Produtos</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="conteudo">Conteúdo educativo</SelectItem>
                      <SelectItem value="promocoes">Promoções</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="consentimento"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs text-gray-400">
                      Concordo em receber comunicações e aceito a política de privacidade
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={form.handleSubmit((data) => {
            const enrichedData = { ...data, origem };
            handleSubmit(enrichedData).then(success => {
              if (success) onSubmitSuccess(enrichedData);
            });
          })}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Enviando...
            </>
          ) : (
            <>
              Quero receber <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadCaptureForm;

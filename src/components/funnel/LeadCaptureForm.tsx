
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCaptureForm } from "@/hooks/useCaptureForm";

type LeadCaptureFormProps = {
  title: string;
  description: string;
  imageSrc?: string;
  embedded?: boolean;
  origin?: string;
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  interesse: z.string().min(1, { message: "Selecione um interesse" }),
  consentimento: z.boolean().refine(val => val === true, {
    message: "Você precisa concordar com os termos",
  }),
});

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  title,
  description,
  imageSrc,
  embedded = false,
  origin = "website",
}) => {
  const { form, isSubmitting, handleSubmit } = useCaptureForm();

  // Esta função será chamada quando o usuário enviar o formulário
  const onSubmitForm = async () => {
    // Aqui usamos o hook customizado para processar o envio
    // O hook já gerencia o estado de carregamento e exibe as notificações
    return await handleSubmit();
  };

  return (
    <Card className={`bg-gray-800 border-gray-700 max-w-md mx-auto ${embedded ? "shadow-none" : "shadow-xl"}`}>
      {imageSrc && (
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              {...form.register("phone")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interesse">Qual seu interesse?</Label>
            <Select
              onValueChange={(value) => form.setValue("interesse", value)}
              defaultValue={form.getValues("interesse")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produto">Conhecer produtos</SelectItem>
                <SelectItem value="precos">Informações de preços</SelectItem>
                <SelectItem value="suporte">Suporte técnico</SelectItem>
                <SelectItem value="parceria">Parcerias</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.interesse && (
              <p className="text-xs text-red-500">
                {form.formState.errors.interesse.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="consentimento" 
              checked={form.getValues("consentimento")}
              onCheckedChange={(checked) => form.setValue("consentimento", checked === true)}
            />
            <label
              htmlFor="consentimento"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concordo em receber comunicações por email
            </label>
          </div>
          {form.formState.errors.consentimento && (
            <p className="text-xs text-red-500">
              {form.formState.errors.consentimento.message}
            </p>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmitForm)}
        >
          {isSubmitting ? "Processando..." : "Receber conteúdo"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeadCaptureForm;

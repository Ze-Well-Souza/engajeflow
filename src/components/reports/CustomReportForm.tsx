
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Download, Loader2 } from "lucide-react";

const formSchema = z.object({
  reportType: z.string().min(1, { message: "Selecione um tipo de relatório" }),
  dateRange: z.enum(["last7days", "last30days", "last90days", "custom"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metrics: z.array(z.string()).min(1, { message: "Selecione pelo menos uma métrica" }),
  reportName: z.string().min(1, { message: "Digite um nome para o relatório" }),
});

type FormValues = z.infer<typeof formSchema>;

const CustomReportForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "",
      dateRange: "last30days",
      metrics: ["engagement", "reach"],
      reportName: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Gerando relatório:", data);

    // Simula um atraso para gerar o relatório
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Relatório gerado com sucesso!",
      description: `O relatório "${data.reportName}" está pronto para download.`,
    });
    
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl">Gerar Relatório Personalizado</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reportName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Relatório</FormLabel>
                    <FormControl>
                      <Input placeholder="Relatório de Desempenho Mensal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Relatório</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de relatório" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="social_media">Desempenho em Redes Sociais</SelectItem>
                        <SelectItem value="conversion">Conversões</SelectItem>
                        <SelectItem value="engagement">Engajamento</SelectItem>
                        <SelectItem value="sales">Vendas por Canal</SelectItem>
                        <SelectItem value="funnel">Funil de Vendas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="last30days">Últimos 30 dias</SelectItem>
                      <SelectItem value="last90days">Últimos 90 dias</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("dateRange") === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data Inicial</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data Final</FormLabel>
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormItem>
              <FormLabel>Métricas Incluídas</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {["Alcance", "Engajamento", "Cliques", "Conversões", "Vendas", "ROI"].map((metric) => (
                  <label key={metric} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-blue-600" 
                      defaultChecked
                    />
                    <span className="text-sm">{metric}</span>
                  </label>
                ))}
              </div>
            </FormItem>
            
            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Gerando Relatório...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" /> 
                    Gerar Relatório
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomReportForm;

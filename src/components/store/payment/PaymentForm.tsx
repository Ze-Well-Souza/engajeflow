
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { toast } from "sonner";

interface PaymentFormProps {
  amount?: number;
  title?: string;
  description?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount = 9990, // R$ 99,90 como padrão
  title = "Pagamento",
  description = "Preencha os dados para concluir seu pagamento",
  onSuccess,
  onCancel
}) => {
  const { formatCurrency } = useCurrency({ defaultCurrency: 'BRL' });
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Funções para formatar inputs
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digits[i];
    }
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de processamento de pagamento
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Na implementação real, aqui seria feita a chamada para o Edge Function do Stripe
      
      toast.success("Pagamento processado com sucesso!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error("Falha ao processar pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-3 bg-muted/20">
            <div className="text-sm text-muted-foreground">Valor</div>
            <div className="text-2xl font-bold">{formatCurrency(amount / 100)}</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card-number">Número do Cartão</Label>
            <div className="relative">
              <Input 
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="pl-10"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card-name">Nome no Cartão</Label>
            <Input 
              id="card-name"
              placeholder="NOME COMPLETO"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-expiry">Validade (MM/AA)</Label>
              <Input 
                id="card-expiry"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-cvc">CVC</Label>
              <Input 
                id="card-cvc"
                placeholder="123"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="save-card" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
            <Label htmlFor="save-card" className="text-sm">Salvar cartão para pagamentos futuros</Label>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center gap-2 border-t pt-2">
            <ShieldCheck className="h-3 w-3" />
            Seus dados de pagamento são processados de forma segura pelo Stripe
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processando..." : "Pagar Agora"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;

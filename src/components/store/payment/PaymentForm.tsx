
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, ShieldCheck, RefreshCw } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { usePaymentProcessor } from "@/hooks/usePaymentProcessor";
import { PaymentMethod, default as PaymentMethodSelector } from "./PaymentMethodSelector";

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
  const { isProcessing, processPayment } = usePaymentProcessor();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
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
    
    if (paymentMethod === 'credit_card') {
      // Validação básica para cartão
      if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
        return;
      }
    }
    
    const result = await processPayment(paymentMethod, {
      amount,
      cardNumber,
      cardName,
      cardExpiry,
      cardCvc,
      saveCard
    });
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const renderPaymentMethodForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <>
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
          </>
        );
      
      case 'pix':
        return (
          <div className="text-center py-6">
            <div className="mx-auto w-48 h-48 border-2 border-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">QR Code PIX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Escaneie o QR Code acima com seu aplicativo bancário ou copie a chave PIX abaixo
            </p>
            <div className="mt-4 p-3 bg-muted text-sm rounded relative">
              <code className="font-mono">PIX123456789ABCDEFGHI</code>
              <Button
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText("PIX123456789ABCDEFGHI");
                  toast.success("Chave PIX copiada!");
                }}
              >
                Copiar
              </Button>
            </div>
          </div>
        );
      
      case 'boleto':
        return (
          <div className="space-y-4 py-2">
            <div className="border rounded p-3 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                O boleto bancário será gerado após a confirmação. O prazo de pagamento é de até 3 dias úteis.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf-cnpj">CPF/CNPJ</Label>
              <Input 
                id="cpf-cnpj"
                placeholder="Digite seu CPF ou CNPJ"
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
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
          
          <PaymentMethodSelector 
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />
          
          {renderPaymentMethodForm()}
          
          <div className="text-xs text-muted-foreground flex items-center gap-2 border-t pt-2">
            <ShieldCheck className="h-3 w-3" />
            Seus dados de pagamento são processados de forma segura
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Pagar Agora"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;

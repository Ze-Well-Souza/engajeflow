
import React, { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface StripeCheckoutButtonProps extends Omit<ButtonProps, 'onError'> {
  productName?: string;
  amount: number; // valor em centavos
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  children,
  productName = "Produto",
  amount,
  currency = "BRL",
  onSuccess,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Simulação de checkout com Stripe - na implementação final, isso seria substituído
      // por uma chamada a uma função Edge Function que criaria uma sessão de checkout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular sucesso para demonstração
      const checkoutUrl = `https://checkout.stripe.com/pay/example-${Date.now()}`;
      
      // Em produção: redirecionar para a URL de checkout
      // window.location.href = checkoutUrl;
      
      // Para fins de demonstração:
      toast.success("Link de pagamento gerado com sucesso!");
      console.log("Checkout URL:", checkoutUrl);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao processar checkout:", error);
      toast.error("Falha ao iniciar o checkout. Tente novamente.");
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        children || `Pagar ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount / 100)}`
      )}
    </Button>
  );
};

export default StripeCheckoutButton;

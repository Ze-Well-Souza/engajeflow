
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { usePaymentProcessor } from '@/hooks/usePaymentProcessor';

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
  const { isProcessing, processStripeCheckout } = usePaymentProcessor();

  const handleCheckout = async () => {
    try {
      const result = await processStripeCheckout({
        amount,
        currency,
        description: productName
      });
      
      if (result.success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao processar checkout:", error);
      if (onError && error instanceof Error) onError(error);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isProcessing}
      {...props}
    >
      {isProcessing ? (
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

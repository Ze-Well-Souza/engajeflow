
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/hooks/useCurrency';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface PaymentOrderSummaryProps {
  items?: OrderItem[];
  subtotal: number;
  discount?: number;
  shipping?: number;
  tax?: number;
}

const PaymentOrderSummary: React.FC<PaymentOrderSummaryProps> = ({
  items = [],
  subtotal,
  discount = 0,
  shipping = 0,
  tax = 0
}) => {
  const { formatCurrency } = useCurrency({ defaultCurrency: 'BRL' });
  const total = subtotal - discount + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                </div>
                <span>{formatCurrency(item.price * item.quantity / 100)}</span>
              </div>
            ))}
            <Separator className="my-2" />
          </div>
        )}
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal / 100)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Desconto</span>
              <span className="text-green-600">-{formatCurrency(discount / 100)}</span>
            </div>
          )}
          
          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Entrega</span>
              <span>{formatCurrency(shipping / 100)}</span>
            </div>
          )}
          
          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Impostos</span>
              <span>{formatCurrency(tax / 100)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 px-6">
        <div className="flex justify-between w-full">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">{formatCurrency(total / 100)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentOrderSummary;

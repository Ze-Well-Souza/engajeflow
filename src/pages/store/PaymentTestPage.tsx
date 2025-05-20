
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentForm from '@/components/store/payment/PaymentForm';
import StripeCheckoutButton from '@/components/store/payment/StripeCheckoutButton';
import PaymentOrderSummary from '@/components/store/payment/PaymentOrderSummary';

const PaymentTestPage = () => {
  const [activeTab, setActiveTab] = useState('direct');
  
  const handlePaymentSuccess = () => {
    console.log('Pagamento realizado com sucesso!');
  };
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Teste de Pagamentos</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="direct">Pagamento Direto</TabsTrigger>
              <TabsTrigger value="stripe">Checkout Stripe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="direct" className="mt-0">
              <PaymentForm 
                amount={12990} 
                title="Checkout de Teste"
                description="Teste as opções de pagamento direto (simulado)"
                onSuccess={handlePaymentSuccess}
              />
            </TabsContent>
            
            <TabsContent value="stripe" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Checkout com Stripe</CardTitle>
                  <CardDescription>
                    Teste a integração com o Stripe usando o botão abaixo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border p-4 rounded-lg bg-muted/20">
                    <h3 className="text-lg font-medium mb-1">Plano Premium</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Acesse todos os recursos e funcionalidades ilimitadas
                    </p>
                    <div className="text-2xl font-bold mb-2">R$ 129,90</div>
                    <div className="text-sm text-muted-foreground">Cobrança mensal</div>
                  </div>
                  
                  <StripeCheckoutButton 
                    amount={12990}
                    productName="Plano Premium"
                    onSuccess={handlePaymentSuccess}
                    className="w-full"
                  >
                    Pagar com Stripe
                  </StripeCheckoutButton>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <PaymentOrderSummary 
            items={[
              { id: '1', name: 'Plano Premium', quantity: 1, price: 12990 }
            ]}
            subtotal={12990}
            discount={1000}
            shipping={0}
            tax={0}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentTestPage;
